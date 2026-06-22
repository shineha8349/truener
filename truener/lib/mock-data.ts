import type { CurrentUser, User, LikeRequest, Match, Message, IcebreakerSuggestion, Tag } from "@/types";

export const mockCurrentUser: CurrentUser = {
  id: "user-me",
  email: "sakura@example.com",
  nickname: "さくら",
  gender: "female",
  age: 28,
  area: "東京都",
  bio: "読書と映画鑑賞が好きです。週末はカフェ巡りや美術館に行くことが多いです。共通の趣味を持つ方とゆっくりお話ししたいです。",
  photoUrls: [
    "/images/profiles/sakura-1.png",
    "/images/profiles/sakura-2.png",
  ],
  tags: [
    { id: "t-1", name: "読書", category: "趣味", emoji: "📚" },
    { id: "t-2", name: "カフェ巡り", category: "趣味", emoji: "☕" },
    { id: "t-3", name: "ランニング", category: "スポーツ", emoji: "🏃" },
    { id: "t-4", name: "映画鑑賞", category: "エンタメ・メディア", emoji: "🎬" },
    { id: "t-5", name: "料理", category: "グルメ", emoji: "🍳" },
  ],
  isAgeVerified: true,
  lastActiveAt: "2026-06-18T07:00:00Z",
  subscriptionStatus: "free",
  likeCountUsed: 0,
  likeCountFreeLimit: 20,
};

export const mockCandidates: User[] = [
  {
    id: "user-kenta",
    nickname: "健太",
    gender: "male",
    age: 31,
    area: "東京都",
    bio: "SREエンジニアとして働いています。休日はランニングや読書を楽しんでいます。一緒にいて笑顔になれる方と出会えたら嬉しいです。趣味の話で盛り上がりましょう！",
    photoUrls: [
      "/images/profiles/kenta-1.png",
      "/images/profiles/kenta-2.png",
    ],
    tags: [
      { id: "t-3", name: "ランニング", category: "スポーツ", emoji: "🏃" },
      { id: "t-5", name: "料理", category: "グルメ", emoji: "🍳" },
      { id: "t-6", name: "旅行", category: "アウトドア", emoji: "✈️" },
      { id: "t-7", name: "テクノロジー", category: "知識", emoji: "💻" },
      { id: "t-8", name: "筋トレ", category: "趣味", emoji: "💪" },
      { id: "t-1", name: "読書", category: "趣味", emoji: "📚" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-18T06:30:00Z",
  },
  {
    id: "user-takumi",
    nickname: "拓海",
    gender: "male",
    age: 29,
    area: "神奈川県",
    bio: "建築デザイナーとして働いています。週末は美術館巡りや写真撮影を楽しんでいます。感性の合う方と深い話がしたいです。",
    photoUrls: [
      "/images/profiles/takumi-1.png",
    ],
    tags: [
      { id: "t-3", name: "ランニング", category: "スポーツ", emoji: "🏃" },
      { id: "t-9", name: "写真", category: "趣味", emoji: "📷" },
      { id: "t-10", name: "アート", category: "文化", emoji: "🎨" },
      { id: "t-1", name: "読書", category: "趣味", emoji: "📚" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-17T20:00:00Z",
  },
  {
    id: "user-ryo",
    nickname: "涼介",
    gender: "male",
    age: 33,
    area: "大阪府",
    bio: "医療系の仕事をしています。休日はキャンプや登山で自然を満喫しています。アウトドアが好きな方と一緒に過ごしたいです。",
    photoUrls: [
      "/images/profiles/ryo-1.png",
    ],
    tags: [
      { id: "t-4", name: "映画鑑賞", category: "エンタメ・メディア", emoji: "🎬" },
      { id: "t-11", name: "登山", category: "趣味", emoji: "⛰️" },
      { id: "t-12", name: "キャンプ", category: "アウトドア", emoji: "⛺" },
      { id: "t-3", name: "ランニング", category: "スポーツ", emoji: "🏃" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-18T01:00:00Z",
  },
  {
    id: "user-sho",
    nickname: "翔",
    gender: "male",
    age: 27,
    area: "愛知県",
    bio: "IT企業でマーケターをしています。音楽フェスやライブが大好きで、毎月どこかに行っています。一緒に楽しめる方を探しています。",
    photoUrls: [
      "/images/profiles/sho-1.png",
    ],
    tags: [
      { id: "t-13", name: "音楽", category: "エンタメ", emoji: "🎵" },
      { id: "t-14", name: "フェス・ライブ", category: "エンタメ", emoji: "🎤" },
      { id: "t-2", name: "カフェ巡り", category: "趣味", emoji: "☕" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-17T15:00:00Z",
  },
  {
    id: "user-aoi",
    nickname: "葵",
    gender: "female",
    age: 26,
    area: "東京都",
    bio: "ファッション関係の仕事をしています。ランニングと映画鑑賞が趣味です。休日はよく公園をジョギングしています。",
    photoUrls: [
      "/images/profiles/aoi-1.png",
      "/images/profiles/aoi-2.png",
    ],
    tags: [
      { id: "t-3", name: "ランニング", category: "スポーツ", emoji: "🏃" },
      { id: "t-9", name: "写真", category: "趣味", emoji: "📷" },
      { id: "t-4", name: "映画鑑賞", category: "エンタメ・メディア", emoji: "🎬" },
      { id: "t-15", name: "ヨガ", category: "フィットネス", emoji: "🧘" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-18T06:00:00Z",
  },
  {
    id: "user-miki",
    nickname: "みき",
    gender: "female",
    age: 30,
    area: "神奈川県",
    bio: "IT企業でデザイナーをしています。料理と筋トレが趣味でバランスを大切にしています。キャンプにもよく行きます。気さくな方とお話しできたら嬉しいです。",
    photoUrls: [
      "/images/profiles/miki-1.png",
    ],
    tags: [
      { id: "t-5", name: "料理", category: "グルメ", emoji: "🍳" },
      { id: "t-8", name: "筋トレ", category: "趣味", emoji: "💪" },
      { id: "t-12", name: "キャンプ", category: "アウトドア", emoji: "⛺" },
      { id: "t-1", name: "読書", category: "趣味", emoji: "📚" },
    ],
    isAgeVerified: true,
    lastActiveAt: "2026-06-17T22:00:00Z",
  },
];

export function getCommonTags(user1Tags: Tag[], user2Tags: Tag[]): Tag[] {
  const user2TagIds = new Set(user2Tags.map((t) => t.id));
  return user1Tags.filter((t) => user2TagIds.has(t.id));
}

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

export const mockMatches: Match[] = [
  {
    id: "match-1",
    partner: mockCandidates[0],
    isFirstMessageSent: true,
    lastMessage: "いつでも気軽に連絡ください！",
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

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    matchId: "match-1",
    senderId: "user-me",
    content: "マッチありがとうございます！よろしくお願いします。",
    isRead: true,
    createdAt: "2026-06-17T18:00:00Z",
  },
  {
    id: "msg-2",
    matchId: "match-1",
    senderId: "user-kenta",
    content: "こちらこそよろしくお願いします！ランニングが趣味とのこと、どのコースを走ることが多いですか？",
    isRead: true,
    createdAt: "2026-06-17T18:30:00Z",
  },
  {
    id: "msg-3",
    matchId: "match-1",
    senderId: "user-me",
    content: "皇居周辺をよく走っています！",
    isRead: true,
    createdAt: "2026-06-17T19:00:00Z",
  },
  {
    id: "msg-4",
    matchId: "match-1",
    senderId: "user-kenta",
    content: "いつでも気軽に連絡ください！",
    isRead: false,
    createdAt: "2026-06-18T06:00:00Z",
  },
];

export const mockIcebreakerSuggestions: IcebreakerSuggestion[] = [
  {
    text: "ランニングはどんなコースを走ることが多いですか？",
    relatedTag: "ランニング",
    emoji: "🏃",
  },
  {
    text: "最近観た映画で印象に残ったものはありますか？",
    relatedTag: "映画鑑賞",
    emoji: "🎬",
  },
  {
    text: "おすすめのカフェがあったら教えてください！",
    relatedTag: "カフェ巡り",
    emoji: "☕",
  },
];

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
