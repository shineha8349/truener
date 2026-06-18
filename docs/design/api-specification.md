# API仕様書 — Truener

---

## 1. 設計原則

- **アーキテクチャ:** RESTful API（Next.js App Router の Route Handlers）
- **ベースURL:** `/api/` （Vercel上のサーバーレス関数として動作）
- **レスポンス形式:** JSON
- **文字コード:** UTF-8
- **エラーレスポンス:** 統一フォーマット `{ "error": "error_code", "message": "説明文" }`

---

## 2. 認証・認可

全APIエンドポイント（Stripe Webhookを除く）は Supabase Auth の JWT トークンによる認証が必要。

### 認証方式

```
Authorization: Bearer {supabase_access_token}
```

- トークンは Supabase Auth が発行する JWT
- クライアントは `supabase.auth.getSession()` で取得したアクセストークンをヘッダーに付与
- サーバーサイドでは `createServerClient` + `cookies()` によりセッションを自動検証

### 認可チェック順序

1. JWT有効性の検証（Middleware）
2. `users.is_age_verified === true` の確認（年齢確認完了チェック）
3. リソースのオーナーシップ確認（各Route Handler内）

### 共通エラーレスポンス

| HTTPステータス | error_code | 説明 |
|---------------|-----------|------|
| 401 | `unauthorized` | 未認証またはトークン無効 |
| 403 | `forbidden` | 認証済みだがアクセス権限なし |
| 402 | `subscription_required` | 課金が必要な操作 |
| 404 | `not_found` | リソースが存在しない |
| 422 | `validation_error` | バリデーションエラー |
| 500 | `internal_error` | サーバー内部エラー |

---

## 3. エンドポイント一覧

| メソッド | エンドポイント | 概要 | 認証 |
|----------|--------------|------|------|
| POST | `/api/auth/profile` | 初回プロフィール登録 | 要 |
| POST | `/api/age-verify` | 年齢確認書類アップロード | 要 |
| GET | `/api/candidates` | マッチング候補一覧取得 | 要 |
| GET | `/api/users/[userId]` | ユーザー詳細取得 | 要 |
| POST | `/api/tags/generate` | AIタグ自動生成 | 要 |
| PUT | `/api/tags` | タグ一括更新（修正・追加） | 要 |
| POST | `/api/likes` | いいね送信 | 要 |
| GET | `/api/likes/requests` | いいねリクエスト一覧取得（女性） | 要 |
| PATCH | `/api/likes/[likeId]` | いいね承認・スキップ | 要 |
| GET | `/api/matches` | マッチング一覧取得 | 要 |
| GET | `/api/matches/[matchId]/messages` | メッセージ一覧取得 | 要 |
| POST | `/api/matches/[matchId]/messages` | メッセージ送信 | 要 |
| POST | `/api/icebreaker` | AIアイスブレイカー生成 | 要 |
| POST | `/api/blocks` | ブロック実行 | 要 |
| POST | `/api/reports` | 通報実行 | 要 |
| POST | `/api/subscriptions/checkout` | Stripe Checkout セッション作成 | 要 |
| POST | `/api/webhooks/stripe` | Stripe Webhook受信 | 不要（署名検証） |

---

## 4. エンドポイント詳細

### 4.1 `POST /api/tags/generate` — AIタグ自動生成

**概要:** InstagramアクセストークンをもとにAIが趣味タグを生成する

**リクエスト:**
```http
POST /api/tags/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "instagram_access_token": "IGQVJVNm..."
}
```

**処理フロー:**
1. Instagramアクセストークンを使い Instagram Graph API から投稿・いいね情報を取得
2. 取得データを OpenAI GPT-4o-mini に送信してタグ生成
3. 生成タグを `tags` テーブルにUPSERT、`user_tags` テーブルに保存
4. 生成タグ一覧を返却

**レスポンス（200 OK）:**
```json
{
  "tags": [
    { "id": "uuid-1", "name": "音楽好き", "category": "趣味", "emoji": "🎵" },
    { "id": "uuid-2", "name": "ライブ好き", "category": "趣味", "emoji": "🎤" },
    { "id": "uuid-3", "name": "カフェ巡り", "category": "グルメ", "emoji": "☕" }
  ],
  "generated_count": 12
}
```

**エラーレスポンス（500）:**
```json
{
  "error": "tag_generation_failed",
  "message": "SNSデータの取得に失敗しました。手動でタグを設定してください。"
}
```

---

### 4.2 `POST /api/icebreaker` — AIアイスブレイカー生成

**概要:** 共通タグをもとにAIが最初のメッセージ候補を2〜3パターン生成する

**リクエスト:**
```http
POST /api/icebreaker
Authorization: Bearer {token}
Content-Type: application/json

{
  "match_id": "uuid-match-xxx",
  "common_tags": ["音楽好き", "ライブ好き", "カフェ巡り"]
}
```

**バリデーション:**
- `match_id`: 認証ユーザーがそのマッチングの当事者であること
- `common_tags`: 0個でも可（汎用提案にフォールバック）

**レスポンス（200 OK）:**
```json
{
  "suggestions": [
    {
      "text": "最近ライブ行きましたか？どのアーティストが好きですか？",
      "related_tag": "ライブ好き",
      "emoji": "🎤"
    },
    {
      "text": "お気に入りのカフェってありますか？最近どこか行きましたか？",
      "related_tag": "カフェ巡り",
      "emoji": "☕"
    },
    {
      "text": "音楽はどんなジャンルが好きですか？",
      "related_tag": "音楽好き",
      "emoji": "🎵"
    }
  ]
}
```

**エラーレスポンス（403）:**
```json
{
  "error": "forbidden",
  "message": "このマッチングのアイスブレイカーを生成する権限がありません。"
}
```

---

### 4.3 `POST /api/likes` — いいね送信

**概要:** 男性ユーザーが女性ユーザーにいいね（リクエスト）を送る

**リクエスト:**
```http
POST /api/likes
Authorization: Bearer {token}
Content-Type: application/json

{
  "to_user_id": "uuid-target-user"
}
```

**処理フロー:**
1. 認証ユーザーの性別チェック（男性のみ実行可）
2. 無料いいね残数チェック（`subscriptions.like_count_used < 20`）
3. ブロック関係チェック
4. `likes` テーブルにINSERT（`status: 'pending'`）
5. `subscriptions.like_count_used` をインクリメント

**レスポンス（201 Created）:**
```json
{
  "like_id": "uuid-like-zzz",
  "status": "pending",
  "remaining_free_likes": 15,
  "message": "いいねを送りました！相手の返事を待ちましょう。"
}
```

**レスポンス（402 Payment Required）:**
```json
{
  "error": "subscription_required",
  "message": "無料いいねの上限（20回）に達しました。月額プランへ登録してください。",
  "checkout_url": "https://checkout.stripe.com/pay/cs_live_xxx"
}
```

**エラーレスポンス（403）:**
```json
{
  "error": "forbidden",
  "message": "女性ユーザーはいいねを送信できません。"
}
```

---

### 4.4 `PATCH /api/likes/[likeId]` — いいね承認・スキップ

**概要:** 女性ユーザーが届いたいいねリクエストを承認またはスキップする

**リクエスト:**
```http
PATCH /api/likes/uuid-like-xxx
Authorization: Bearer {token}
Content-Type: application/json

{
  "action": "approved"
}
```

**バリデーション:**
- `action`: `"approved"` または `"skipped"`
- 認証ユーザーが `likes.to_user_id` であること

**処理フロー（承認の場合）:**
1. `likes.status` を `'approved'` に更新
2. `matches` テーブルに新規レコードをINSERT
3. 双方のユーザーに通知（アプリ内通知・Realtime）

**レスポンス（200 OK）— 承認時:**
```json
{
  "match_id": "uuid-match-new",
  "message": "マッチングが成立しました！",
  "matched_user": {
    "id": "uuid-male-user",
    "nickname": "健太",
    "photoUrl": "https://..."
  }
}
```

**レスポンス（200 OK）— スキップ時:**
```json
{
  "status": "skipped",
  "message": "スキップしました。"
}
```

---

### 4.5 `POST /api/matches/[matchId]/messages` — メッセージ送信

**概要:** マッチングした相手にメッセージを送信する

**リクエスト:**
```http
POST /api/matches/uuid-match-xxx/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "最近ライブ行きましたか？どのアーティストが好きですか？"
}
```

**バリデーション:**
- 認証ユーザーがマッチングの当事者であること
- 女性ファーストメッセージ制のチェック：`matches.is_first_message_sent === false` の場合、送信者が女性であること
- `content` は空文字不可・最大1000文字

**処理フロー:**
1. マッチングの当事者確認
2. 女性ファーストメッセージチェック
3. `messages` テーブルにINSERT
4. 初回送信の場合 `matches.is_first_message_sent` を `true` に更新
5. Supabase Realtime が相手のチャット画面に自動配信

**レスポンス（201 Created）:**
```json
{
  "message_id": "uuid-msg-yyy",
  "content": "最近ライブ行きましたか？どのアーティストが好きですか？",
  "created_at": "2026-06-18T07:00:00Z"
}
```

**エラーレスポンス（403）— 女性ファーストメッセージ制違反:**
```json
{
  "error": "first_message_restriction",
  "message": "最初のメッセージは相手の女性から送られます。返信をお待ちください。"
}
```

---

### 4.6 `POST /api/age-verify` — 年齢確認書類アップロード

**概要:** 公的証明書の画像をアップロードし、年齢確認審査を申請する

**リクエスト:**
```http
POST /api/age-verify
Authorization: Bearer {token}
Content-Type: multipart/form-data

document: (画像ファイル: jpg/png/pdf, 最大10MB)
```

**処理フロー:**
1. ファイル形式・サイズのバリデーション
2. Supabase Storage の非公開バケットにアップロード（暗号化）
3. `age_verifications` テーブルにレコードをINSERT（`status: 'pending'`）
4. 審査担当者への通知（メール or 管理画面）

**レスポンス（201 Created）:**
```json
{
  "verification_id": "uuid-verify-xxx",
  "status": "pending",
  "message": "書類を受け付けました。審査完了まで1〜2営業日お待ちください。"
}
```

---

### 4.7 `POST /api/subscriptions/checkout` — Stripe Checkout セッション作成

**概要:** 男性ユーザーの月額プラン加入のためのStripe Checkoutセッションを生成する

**リクエスト:**
```http
POST /api/subscriptions/checkout
Authorization: Bearer {token}
Content-Type: application/json

{}
```

**処理フロー:**
1. 認証ユーザーのStripe顧客IDを取得または作成
2. Stripe Checkout Session を作成（月額6,000円プラン）
3. 成功URL・キャンセルURLを設定
4. Checkout URLを返却

**レスポンス（200 OK）:**
```json
{
  "checkout_url": "https://checkout.stripe.com/pay/cs_live_xxx"
}
```

---

### 4.8 `POST /api/webhooks/stripe` — Stripe Webhook

**概要:** Stripeからの課金イベントを受信し、課金状態をDBに反映する

**認証:** `stripe-signature` ヘッダーによる署名検証（JWTではない）

**処理するイベント:**

| イベント | 処理内容 |
|----------|---------|
| `checkout.session.completed` | `subscriptions.status` を `'active'` に更新 |
| `invoice.payment_succeeded` | 月次更新時に `like_count_used` をリセット・`current_period_end` を更新 |
| `customer.subscription.deleted` | `subscriptions.status` を `'canceled'` に更新 |
| `invoice.payment_failed` | `subscriptions.status` を `'past_due'` に更新 |

**レスポンス（200 OK）:**
```json
{ "received": true }
```

---

## 5. OpenAI プロンプト設計

### タグ生成プロンプト

```
システム: あなたはSNS投稿から趣味・嗜好を分析するアシスタントです。
マッチングアプリで使用する趣味タグを生成してください。
- タグは日本語で、短く具体的に（例: 「音楽好き」「カフェ巡り」「登山」）
- カテゴリは以下から選択: 趣味, グルメ, スポーツ, アウトドア, エンタメ, 学習, ライフスタイル
- 各タグに合う絵文字を1つ付ける
- 10〜15個生成する
- 不適切な内容は含めない
- JSONフォーマットで出力: { "tags": [{"name": "", "category": "", "emoji": ""}] }

ユーザー: 以下のInstagramデータから趣味タグを生成してください。
{instagram_data}
```

### アイスブレイカー生成プロンプト

```
システム: あなたはマッチングアプリのコミュニケーションサポートアシスタントです。
2人のユーザーの共通の趣味から、自然な最初のメッセージを提案してください。
- カジュアルで親しみやすいトーン
- 質問形式で会話が続きやすい内容
- 共通タグに直接関連した内容
- 2〜3パターン生成
- JSONフォーマットで出力: { "suggestions": [{"text": "", "related_tag": "", "emoji": ""}] }

ユーザー: 共通の趣味タグ: {common_tags}
```
