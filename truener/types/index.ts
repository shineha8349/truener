export type Gender = "female" | "male";

export type Tag = {
  id: string;
  name: string;
  category: string;
  emoji: string;
};

export type User = {
  id: string;
  nickname: string;
  gender: Gender;
  age: number;
  area: string;
  bio: string;
  photoUrls: string[];
  tags: Tag[];
  isAgeVerified: boolean;
  lastActiveAt: string;
};

export type LikeStatus = "pending" | "approved" | "skipped";

export type LikeRequest = {
  id: string;
  fromUser: User;
  toUserId: string;
  status: LikeStatus;
  createdAt: string;
  commonTags: Tag[];
};

export type Match = {
  id: string;
  partner: User;
  isFirstMessageSent: boolean;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  commonTags: Tag[];
  matchedAt: string;
};

export type Message = {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

export type IcebreakerSuggestion = {
  text: string;
  relatedTag: string;
  emoji: string;
};

export type SubscriptionStatus = "free" | "active" | "canceled";

export type CurrentUser = User & {
  email: string;
  subscriptionStatus: SubscriptionStatus;
  likeCountUsed: number;
  likeCountFreeLimit: number;
};
