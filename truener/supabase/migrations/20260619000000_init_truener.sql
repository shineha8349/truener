-- ============================================================
-- Truener — 初期スキーマ（Clerk 統合版）
-- 作成日: 2026-06-19
-- 概要: 全テーブル・RLSポリシー・インデックス・トリガーを定義
-- 認証: Clerk JWT（auth.jwt() ->> 'sub' = clerk_user_id）
-- ============================================================

-- ────────────────────────────────────────
-- ユーティリティ: updated_at 自動更新トリガー
-- ────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ────────────────────────────────────────
-- ユーティリティ: Clerk JWT から Supabase ユーザー ID を取得
-- ────────────────────────────────────────
create or replace function public.current_user_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.users
  where clerk_user_id = (select auth.jwt() ->> 'sub');
$$;

comment on function public.current_user_id() is 'Clerk JWT の sub から Truener users.id を解決する';

-- ────────────────────────────────────────
-- 1. users — ユーザー基本情報
-- ────────────────────────────────────────
create table public.users (
  id                  uuid        primary key default gen_random_uuid(),
  clerk_user_id       text        not null unique,
  email               text        not null unique,
  nickname            text,
  gender              text        check (gender is null or gender in ('male', 'female')),
  birth_date          date,
  area                text,
  bio                 text,
  is_age_verified     boolean     not null default false,
  is_active           boolean     not null default true,
  is_profile_complete boolean     not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.users is 'Truenerのユーザー基本情報。Clerk と同期する。';

create trigger users_updated_at
  before update on public.users
  for each row execute function public.handle_updated_at();

create index idx_users_clerk_user_id on public.users(clerk_user_id);
create index idx_users_gender        on public.users(gender);
create index idx_users_area          on public.users(area);
create index idx_users_is_active     on public.users(is_active);

alter table public.users enable row level security;

create policy "users: select own" on public.users
  for select to authenticated
  using (clerk_user_id = (select auth.jwt() ->> 'sub'));

create policy "users: select matched partners" on public.users
  for select to authenticated
  using (
    id in (
      select user1_id from public.matches where user2_id = (select public.current_user_id())
      union
      select user2_id from public.matches where user1_id = (select public.current_user_id())
    )
  );

create policy "users: select candidates" on public.users
  for select to authenticated
  using (
    is_active = true
    and is_age_verified = true
    and id != (select public.current_user_id())
  );

create policy "users: insert own" on public.users
  for insert to authenticated
  with check (clerk_user_id = (select auth.jwt() ->> 'sub'));

create policy "users: update own" on public.users
  for update to authenticated
  using (clerk_user_id = (select auth.jwt() ->> 'sub'));

-- ────────────────────────────────────────
-- 2. user_photos — プロフィール写真
-- ────────────────────────────────────────
create table public.user_photos (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references public.users(id) on delete cascade,
  storage_url   text        not null,
  display_order int         not null default 0,
  created_at    timestamptz not null default now()
);

comment on table public.user_photos is 'ユーザーのプロフィール写真。1ユーザー最大6枚。';

alter table public.user_photos enable row level security;

create policy "user_photos: select active users" on public.user_photos
  for select to authenticated using (true);

create policy "user_photos: insert own" on public.user_photos
  for insert to authenticated
  with check ((select public.current_user_id()) = user_id);

create policy "user_photos: update own" on public.user_photos
  for update to authenticated
  using ((select public.current_user_id()) = user_id);

create policy "user_photos: delete own" on public.user_photos
  for delete to authenticated
  using ((select public.current_user_id()) = user_id);

-- ────────────────────────────────────────
-- 3. age_verifications — 年齢確認
-- ────────────────────────────────────────
create table public.age_verifications (
  id                     uuid        primary key default gen_random_uuid(),
  user_id                uuid        not null unique references public.users(id) on delete cascade,
  document_url_encrypted text        not null,
  status                 text        not null default 'pending'
                           check (status in ('pending', 'approved', 'rejected')),
  verified_at            timestamptz,
  created_at             timestamptz not null default now()
);

comment on table public.age_verifications is '年齢確認書類の申請・審査状態を管理する。';

alter table public.age_verifications enable row level security;

create policy "age_verifications: select own" on public.age_verifications
  for select to authenticated
  using ((select public.current_user_id()) = user_id);

create policy "age_verifications: insert own" on public.age_verifications
  for insert to authenticated
  with check ((select public.current_user_id()) = user_id);

-- ────────────────────────────────────────
-- 4. sns_connections — SNS連携情報
-- ────────────────────────────────────────
create table public.sns_connections (
  id                     uuid        primary key default gen_random_uuid(),
  user_id                uuid        not null references public.users(id) on delete cascade,
  provider               text        not null check (provider in ('instagram', 'twitter')),
  access_token_encrypted text        not null,
  connected_at           timestamptz not null default now(),
  expires_at             timestamptz,
  unique (user_id, provider)
);

comment on table public.sns_connections is 'InstagramなどSNS連携のアクセストークンを暗号化して保管する。';

alter table public.sns_connections enable row level security;

create policy "sns_connections: select own" on public.sns_connections
  for select to authenticated using ((select public.current_user_id()) = user_id);

create policy "sns_connections: insert own" on public.sns_connections
  for insert to authenticated with check ((select public.current_user_id()) = user_id);

create policy "sns_connections: update own" on public.sns_connections
  for update to authenticated using ((select public.current_user_id()) = user_id);

create policy "sns_connections: delete own" on public.sns_connections
  for delete to authenticated using ((select public.current_user_id()) = user_id);

-- ────────────────────────────────────────
-- 5. tags — タグマスター
-- ────────────────────────────────────────
create table public.tags (
  id       uuid primary key default gen_random_uuid(),
  name     text not null unique,
  category text not null,
  emoji    text not null
);

comment on table public.tags is '趣味タグのマスターテーブル。AIが生成したタグをUPSERTする。';

alter table public.tags enable row level security;

create policy "tags: select authenticated" on public.tags
  for select to authenticated using (true);

-- ────────────────────────────────────────
-- 6. user_tags — ユーザー×タグ
-- ────────────────────────────────────────
create table public.user_tags (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references public.users(id) on delete cascade,
  tag_id            uuid        not null references public.tags(id),
  is_auto_generated boolean     not null default false,
  is_active         boolean     not null default true,
  created_at        timestamptz not null default now(),
  unique (user_id, tag_id)
);

comment on table public.user_tags is 'ユーザーとタグの中間テーブル。AI自動生成か手動追加かを区別する。';

create index idx_user_tags_user_id on public.user_tags(user_id) where is_active = true;

alter table public.user_tags enable row level security;

create policy "user_tags: select all" on public.user_tags
  for select to authenticated using (true);

create policy "user_tags: insert own" on public.user_tags
  for insert to authenticated with check ((select public.current_user_id()) = user_id);

create policy "user_tags: update own" on public.user_tags
  for update to authenticated using ((select public.current_user_id()) = user_id);

create policy "user_tags: delete own" on public.user_tags
  for delete to authenticated using ((select public.current_user_id()) = user_id);

-- ────────────────────────────────────────
-- 7. likes — いいね（リクエスト）
-- ────────────────────────────────────────
create table public.likes (
  id           uuid        primary key default gen_random_uuid(),
  from_user_id uuid        not null references public.users(id),
  to_user_id   uuid        not null references public.users(id),
  status       text        not null default 'pending'
                 check (status in ('pending', 'approved', 'skipped')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (from_user_id, to_user_id)
);

comment on table public.likes is 'いいね（マッチングリクエスト）の送受信と承認状態を管理する。';

create trigger likes_updated_at
  before update on public.likes
  for each row execute function public.handle_updated_at();

create index idx_likes_to_user_id   on public.likes(to_user_id, status);
create index idx_likes_from_user_id on public.likes(from_user_id);

alter table public.likes enable row level security;

create policy "likes: select own" on public.likes
  for select to authenticated
  using (
    (select public.current_user_id()) = from_user_id
    or (select public.current_user_id()) = to_user_id
  );

create policy "likes: insert own" on public.likes
  for insert to authenticated
  with check ((select public.current_user_id()) = from_user_id);

create policy "likes: update receiver" on public.likes
  for update to authenticated
  using ((select public.current_user_id()) = to_user_id);

-- ────────────────────────────────────────
-- 8. matches — マッチング成立記録
-- ────────────────────────────────────────
create table public.matches (
  id                    uuid        primary key default gen_random_uuid(),
  user1_id              uuid        not null references public.users(id),
  user2_id              uuid        not null references public.users(id),
  is_first_message_sent boolean     not null default false,
  matched_at            timestamptz not null default now(),
  unique (user1_id, user2_id)
);

comment on table public.matches is 'マッチング成立したユーザーペア。女性ファーストメッセージの状態も管理する。';

create index idx_matches_user1 on public.matches(user1_id);
create index idx_matches_user2 on public.matches(user2_id);

alter table public.matches enable row level security;

create policy "matches: select own" on public.matches
  for select to authenticated
  using (
    (select public.current_user_id()) = user1_id
    or (select public.current_user_id()) = user2_id
  );

create policy "matches: update own" on public.matches
  for update to authenticated
  using (
    (select public.current_user_id()) = user1_id
    or (select public.current_user_id()) = user2_id
  );

-- ────────────────────────────────────────
-- 9. messages — チャットメッセージ
-- ────────────────────────────────────────
create table public.messages (
  id         uuid        primary key default gen_random_uuid(),
  match_id   uuid        not null references public.matches(id) on delete cascade,
  sender_id  uuid        not null references public.users(id),
  content    text        not null check (char_length(content) between 1 and 1000),
  is_read    boolean     not null default false,
  created_at timestamptz not null default now()
);

comment on table public.messages is 'マッチング成立後のチャットメッセージ。Realtimeで配信する。';

create index idx_messages_match_id on public.messages(match_id, created_at desc);

alter table public.messages enable row level security;

create policy "messages: select match members" on public.messages
  for select to authenticated
  using (
    (select public.current_user_id()) in (
      select user1_id from public.matches where id = match_id
      union
      select user2_id from public.matches where id = match_id
    )
  );

create policy "messages: insert own" on public.messages
  for insert to authenticated
  with check (
    (select public.current_user_id()) = sender_id
    and (select public.current_user_id()) in (
      select user1_id from public.matches where id = match_id
      union
      select user2_id from public.matches where id = match_id
    )
  );

create policy "messages: update read" on public.messages
  for update to authenticated
  using (
    (select public.current_user_id()) in (
      select user1_id from public.matches where id = match_id
      union
      select user2_id from public.matches where id = match_id
    )
  );

-- ────────────────────────────────────────
-- 10. subscriptions — 課金情報
-- ────────────────────────────────────────
create table public.subscriptions (
  id                     uuid        primary key default gen_random_uuid(),
  user_id                uuid        not null unique references public.users(id) on delete cascade,
  stripe_customer_id     text        unique,
  stripe_subscription_id text        unique,
  status                 text        not null default 'free'
                           check (status in ('free', 'active', 'canceled', 'past_due')),
  like_count_used        int         not null default 0,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now()
);

comment on table public.subscriptions is 'Stripe連携による男性ユーザーの課金状態と無料いいね使用数を管理する。';

alter table public.subscriptions enable row level security;

create policy "subscriptions: select own" on public.subscriptions
  for select to authenticated using ((select public.current_user_id()) = user_id);

create policy "subscriptions: insert own" on public.subscriptions
  for insert to authenticated with check ((select public.current_user_id()) = user_id);

-- ────────────────────────────────────────
-- 11. blocks — ブロック
-- ────────────────────────────────────────
create table public.blocks (
  id         uuid        primary key default gen_random_uuid(),
  blocker_id uuid        not null references public.users(id),
  blocked_id uuid        not null references public.users(id),
  created_at timestamptz not null default now(),
  unique (blocker_id, blocked_id)
);

comment on table public.blocks is 'ユーザー間のブロック関係を管理する。';

alter table public.blocks enable row level security;

create policy "blocks: select own" on public.blocks
  for select to authenticated using ((select public.current_user_id()) = blocker_id);

create policy "blocks: insert own" on public.blocks
  for insert to authenticated with check ((select public.current_user_id()) = blocker_id);

create policy "blocks: delete own" on public.blocks
  for delete to authenticated using ((select public.current_user_id()) = blocker_id);

-- ────────────────────────────────────────
-- 12. reports — 通報
-- ────────────────────────────────────────
create table public.reports (
  id          uuid        primary key default gen_random_uuid(),
  reporter_id uuid        not null references public.users(id),
  reported_id uuid        not null references public.users(id),
  reason      text        not null check (reason in ('spam', 'harassment', 'fake', 'other')),
  detail      text,
  created_at  timestamptz not null default now()
);

comment on table public.reports is 'ユーザーによる通報を記録する。管理者が確認・対応する。';

alter table public.reports enable row level security;

create policy "reports: insert own" on public.reports
  for insert to authenticated with check ((select public.current_user_id()) = reporter_id);

create policy "reports: select own" on public.reports
  for select to authenticated using ((select public.current_user_id()) = reporter_id);
