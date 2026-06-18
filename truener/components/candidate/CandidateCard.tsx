"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import type { User, Tag } from "@/types";
import TagBadge from "@/components/ui/TagBadge";

type CandidateCardProps = {
  user: User;
  commonTags: Tag[];
};

export default function CandidateCard({ user, commonTags }: CandidateCardProps) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleLike = () => {
    if (liked) return;
    setAnimating(true);
    setLiked(true);
    setTimeout(() => setAnimating(false), 400);
  };

  const displayTags = commonTags.slice(0, 3);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] overflow-hidden">
      {/* Photo */}
      <Link href={`/users/${user.id}`} aria-label={`${user.nickname}さんのプロフィールを見る`}>
        <div className="relative aspect-[3/4] w-full bg-[#F8F8F8]">
          <Image
            src={user.photoUrls[0]}
            alt={`${user.nickname}さんのプロフィール写真`}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-lg font-bold text-[#333333]">
            {user.nickname}
          </h2>
          <span className="text-sm text-[#888888]">
            {user.age}歳・{user.area}
          </span>
        </div>

        {/* Common tags */}
        {commonTags.length > 0 && (
          <div className="mt-3 bg-[#e8faf6] rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-[#1ABC9C]" />
              <span className="text-xs font-semibold text-[#1ABC9C]">
                共通点 {commonTags.length}個
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} variant="common" size="sm" />
              ))}
              {commonTags.length > 3 && (
                <span className="text-[11px] text-[#1ABC9C] font-medium self-center">
                  +{commonTags.length - 3}個
                </span>
              )}
            </div>
          </div>
        )}

        {/* Like button */}
        <button
          onClick={handleLike}
          disabled={liked}
          aria-label={liked ? "いいね済み" : `${user.nickname}さんにいいねを送る`}
          aria-pressed={liked}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
            liked
              ? "bg-[#FFE4E4] text-[#FF6B6B] cursor-default"
              : "bg-[#FF6B6B] hover:bg-[#FF5252] text-white active:scale-95"
          }`}
        >
          <Heart
            size={18}
            className={`transition-transform duration-200 ${animating ? "scale-125" : "scale-100"}`}
            fill={liked ? "#FF6B6B" : "white"}
            stroke={liked ? "#FF6B6B" : "white"}
          />
          {liked ? "いいねを送りました" : "いいねを送る"}
        </button>
      </div>
    </article>
  );
}
