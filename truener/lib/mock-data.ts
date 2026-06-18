import type { CurrentUser, User, LikeRequest, Match, Message, IcebreakerSuggestion, Tag } from "@/types";

// ───── Mock Current User（女性ユーザー） ─────
export const mockCurrentUser: CurrentUser = {
  id: "user-me",
  email: "sakura@example.com",
  nickname: "さくら",
  gender: "female",
  age: 28,
  area: "東京都",
  bio: "広告代理店でマーケターをしています。週末はカフェ巡りや音楽フェスに行くのが好きです。一緒に新しい場所を探検できる人と出会いたいです☕",
  photoUrls: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=533&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=533&fit=crop",
  ],
  tags: [
    { id: "t-1", name: "音楽好き", category: "趣味", emoji: "🎵" },
    { id: "t-2", name: "ライブ好き", category: "趣味", emoji: "🎤" },
    { id: "t-3", name: "カフェ巡り", category: "グルメ", emoji: "☕" },
    { id: "t-4", name: "旅行好き", category: "ライフスタイル", emoji: "✈️" },
    { id: "t-5", name: "映画好き", category: "エンタメ", emoji: "🎬" },
  ],
  isAgeVerified: true,
  lastActiveAt: "2026-06-18T07:00:00Z",
  subscriptionStatus: "free",
  likeCountUsed: 0,
  likeCountFreeLimit: 20,
};

// ───── Mock Candidate Users ─────
export const mockCandidates: User[] = [
  {
    id: "user-kenta",
    nickname: "健太",
    gender: "male",
    age: 31,
    area: "神奈川県",
    bio: "SREエンジニアとして働いています。登山が趣味で、最近は丹沢にハマってます。映画はミニシアター系が好き。一緒に週末を楽しめる人と出会いたいです。",
    photoUrls: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop",
    ],
    tags: [
      { id: "t-3", name: "カフェ巡り", category: "グルメ", emoji: "☕" },
      { id: "t-5", name: "映画好き", category: "エンタメ", emoji: "🎬" },
      { id: "t-6", name: "登山", category: "スポーツ", emoji: "🏔️" },
      { id: "t-7", name: "クラフトビール", category: "グルメ", emoji: "🍺" },
      { id: "t-8", name: "読書", category: "趣味", emoji: "📚" },
      { id: "t-1", name: "音楽好き", category: "趣味", emoji: "🎵" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-18T06:30:00Z",
  },
  {
    id: "user-takumi",
    nickname: "たくみ",
    gender: "male",
    age: 29,
    area: "東京都",
    bio: "料理研究家として活動しています。週末は市場を巡って食材を集めるのが楽しみです。一緒に美味しいものを食べ歩ける人を探しています。",
    photoUrls: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=533&fit=crop",
    ],
    tags: [
      { id: "t-3", name: "カフェ巡り", category: "グルメ", emoji: "☕" },
      { id: "t-9", name: "料理", category: "趣味", emoji: "🍳" },
      { id: "t-10", name: "グルメ", category: "グルメ", emoji: "🍜" },
      { id: "t-1", name: "音楽好き", category: "趣味", emoji: "🎵" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-17T20:00:00Z",
  },
  {
    id: "user-ryo",
    nickname: "りょう",
    gender: "male",
    age: 33,
    area: "東京都",
    bio: "デザイナーをしています。美術館巡りや写真撮影が趣味。旅先で面白いものを見つけるのが好きです。",
    photoUrls: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=533&fit=crop",
    ],
    tags: [
      { id: "t-4", name: "旅行好き", category: "ライフスタイル", emoji: "✈️" },
      { id: "t-11", name: "写真", category: "趣味", emoji: "📷" },
      { id: "t-12", name: "美術館", category: "エンタメ", emoji: "🎨" },
      { id: "t-3", name: "カフェ巡り", category: "グルメ", emoji: "☕" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-18T01:00:00Z",
  },
  {
    id: "user-sho",
    nickname: "しょう",
    gender: "male",
    age: 27,
    area: "埼玉県",
    bio: "スポーツが大好き！週末はサッカーかランニング。健康的な生活を一緒に楽しめる人と出会いたいです。",
    photoUrls: [
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=533&fit=crop",
    ],
    tags: [
      { id: "t-13", name: "サッカー", category: "スポーツ", emoji: "⚽" },
      { id: "t-14", name: "ランニング", category: "スポーツ", emoji: "🏃" },
      { id: "t-2", name: "ライブ好き", category: "趣味", emoji: "🎤" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-17T15:00:00Z",
  },
];

// ───── 共通タグ計算 ─────
export function getCommonTags(user1Tags: Tag[], user2Tags: Tag[]): Tag[] {
  const user2TagIds = new Set(user2Tags.map((t) => t.id));
  return user1Tags.filter((t) => user2TagIds.has(t.id));
}

// ───── Mock Like Requests（女性に届いたいいね） ─────
export const mockLikeRequests: LikeRequest[] = [
  {
    id: "like-1",
    fromUser: mockCandidates[0],
    toUserId: "user-me",
    status: "pending",
    createdAt: "2026-06-18T05:00:00Z",
    commonTags: getCommonTags(mockCurrentUser.tags, mockCandidates[0].tags),
  },
  {
    id: "like-2",
    fromUser: mockCandidates[1],
    toUserId: "user-me",
    status: "pending",
    createdAt: "2026-06-17T20:00:00Z",
    commonTags: getCommonTags(mockCurrentUser.tags, mockCandidates[1].tags),
  },
  {
    id: "like-3",
    fromUser: mockCandidates[2],
    toUserId: "user-me",
    status: "pending",
    createdAt: "2026-06-17T10:00:00Z",
    commonTags: getCommonTags(mockCurrentUser.tags, mockCandidates[2].tags),
  },
];

// ───── Mock Matches ─────
export const mockMatches: Match[] = [
  {
    id: "match-1",
    partner: mockCandidates[0],
    isFirstMessageSent: true,
    lastMessage: "最近ライブ行きましたか？",
    lastMessageAt: "2026-06-18T06:00:00Z",
    unreadCount: 1,
    commonTags: getCommonTags(mockCurrentUser.tags, mockCandidates[0].tags),
    matchedAt: "2026-06-17T12:00:00Z",
  },
  {
    id: "match-2",
    partner: mockCandidates[1],
    isFirstMessageSent: false,
    lastMessage: undefined,
    lastMessageAt: undefined,
    unreadCount: 0,
    commonTags: getCommonTags(mockCurrentUser.tags, mockCandidates[1].tags),
    matchedAt: "2026-06-18T03:00:00Z",
  },
];

// ───── Mock Messages ─────
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    matchId: "match-1",
    senderId: "user-me",
    content: "こんにちは！共通点がたくさんあって嬉しいです😊",
    isRead: true,
    createdAt: "2026-06-17T18:00:00Z",
  },
  {
    id: "msg-2",
    matchId: "match-1",
    senderId: "user-kenta",
    content: "こちらこそ！カフェ巡りが好きなんですね、どのエリアが好きですか？",
    isRead: true,
    createdAt: "2026-06-17T18:30:00Z",
  },
  {
    id: "msg-3",
    matchId: "match-1",
    senderId: "user-me",
    content: "代官山や中目黒がお気に入りです☕ 健太さんは？",
    isRead: true,
    createdAt: "2026-06-17T19:00:00Z",
  },
  {
    id: "msg-4",
    matchId: "match-1",
    senderId: "user-kenta",
    content: "最近ライブ行きましたか？",
    isRead: false,
    createdAt: "2026-06-18T06:00:00Z",
  },
];

// ───── Mock Icebreaker Suggestions ─────
export const mockIcebreakerSuggestions: IcebreakerSuggestion[] = [
  {
    text: "最近ライブ行きましたか？どのアーティストが好きですか？",
    relatedTag: "ライブ好き",
    emoji: "🎤",
  },
  {
    text: "お気に入りのカフェはありますか？最近どこか行きましたか？",
    relatedTag: "カフェ巡り",
    emoji: "☕",
  },
  {
    text: "音楽はどんなジャンルが好きですか？",
    relatedTag: "音楽好き",
    emoji: "🎵",
  },
];

// ───── Time formatting ─────
export function formatRelativeTime(dateStr: string): string {
  const now = new Date("2026-06-18T07:00:00Z");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return "たった今";
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHour < 24) return `${diffHour}時間前`;
  return `${diffDay}日前`;
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
}
