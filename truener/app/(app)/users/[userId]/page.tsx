"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, MoreVertical, Sparkles, Clock } from "lucide-react";
import { mockCandidates, mockCurrentUser, getCommonTags, formatRelativeTime } from "@/lib/mock-data";
import TagBadge from "@/components/ui/TagBadge";
import { use } from "react";

export default function ProfileDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const router = useRouter();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user =
    mockCandidates.find((u) => u.id === userId) ?? mockCandidates[0];
  const commonTags = getCommonTags(mockCurrentUser.tags, user.tags);

  const prevPhoto = () =>
    setPhotoIndex((i) => (i > 0 ? i - 1 : user.photoUrls.length - 1));
  const nextPhoto = () =>
    setPhotoIndex((i) => (i < user.photoUrls.length - 1 ? i + 1 : 0));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            aria-label="戻る"
            className="p-2 -ml-2 rounded-full hover:bg-[#F8F8F8] transition-colors"
          >
            <ArrowLeft size={22} className="text-[#333333]" />
          </button>
          <h1 className="font-semibold text-[#333333]">プロフィール</h1>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
              aria-expanded={menuOpen}
              className="p-2 -mr-2 rounded-full hover:bg-[#F8F8F8] transition-colors"
            >
              <MoreVertical size={22} className="text-[#888888]" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-lg border border-[#E5E5E5] py-1 w-40 z-50">
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-[#333333] hover:bg-[#F8F8F8]"
                  onClick={() => setMenuOpen(false)}
                >
                  ブロック
                </button>
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-[#FF6B6B] hover:bg-[#F8F8F8]"
                  onClick={() => setMenuOpen(false)}
                >
                  通報
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Photos */}
      <div className="relative aspect-[3/4] bg-[#F8F8F8]">
        <Image
          src={user.photoUrls[photoIndex]}
          alt={`${user.nickname}さんの写真 ${photoIndex + 1}枚目`}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 512px"
          priority
        />
        {user.photoUrls.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              aria-label="前の写真"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="次の写真"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {user.photoUrls.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all ${
                    i === photoIndex ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Name & basic info */}
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-[#333333]">{user.nickname}</h2>
            <span className="text-sm text-[#888888]">
              {user.age}歳・{user.area}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Clock size={13} className="text-[#888888]" />
            <span className="text-xs text-[#888888]">
              最終ログイン: {formatRelativeTime(user.lastActiveAt)}
            </span>
          </div>
        </div>

        {/* Common tags */}
        {commonTags.length > 0 && (
          <div className="bg-[#e8faf6] rounded-2xl p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={15} className="text-[#1ABC9C]" />
              <span className="text-sm font-bold text-[#1ABC9C]">
                あなたとの共通点 {commonTags.length}個
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} variant="common" />
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        <div>
          <h3 className="text-sm font-semibold text-[#333333] mb-2">自己紹介</h3>
          <p className="text-sm text-[#555555] leading-relaxed">{user.bio}</p>
        </div>

        {/* All tags */}
        <div>
          <h3 className="text-sm font-semibold text-[#333333] mb-2">タグ</h3>
          <div className="flex flex-wrap gap-2">
            {user.tags.map((tag) => {
              const isCommon = commonTags.some((ct) => ct.id === tag.id);
              return (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  variant={isCommon ? "common" : "default"}
                />
              );
            })}
          </div>
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          disabled={liked}
          aria-label={liked ? "いいね済み" : `${user.nickname}さんにいいねを送る`}
          aria-pressed={liked}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold transition-all duration-200 ${
            liked
              ? "bg-[#FFE4E4] text-[#FF6B6B] cursor-default"
              : "bg-[#FF6B6B] hover:bg-[#FF5252] text-white active:scale-[0.98]"
          }`}
        >
          <Heart size={20} fill={liked ? "#FF6B6B" : "white"} stroke={liked ? "#FF6B6B" : "white"} />
          {liked ? "いいねを送りました ♡" : "いいねを送る"}
        </button>
      </div>
    </div>
  );
}
