"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X, Eye } from "lucide-react";
import { mockLikeRequests, formatRelativeTime } from "@/lib/mock-data";
import type { LikeRequest } from "@/types";
import TagBadge from "@/components/ui/TagBadge";

export default function RequestsPage() {
  const [requests, setRequests] = useState<LikeRequest[]>(mockLikeRequests);

  const handleSkip = (likeId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== likeId));
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] z-40">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-[#333333]">
            リクエスト
            {pendingRequests.length > 0 && (
              <span className="ml-2 bg-[#FF6B6B] text-white text-xs font-bold rounded-full px-2 py-0.5">
                {pendingRequests.length}件
              </span>
            )}
          </h1>
          <p className="text-xs text-[#888888] mt-0.5">
            あなたにいいねを送った方の一覧です
          </p>
        </div>
      </header>

      <section className="px-4 py-4 space-y-3" aria-label="いいねリクエスト一覧">
        {pendingRequests.length === 0 ? (
          <div className="text-center py-20 text-[#888888]">
            <div className="text-4xl mb-4">💌</div>
            <p className="text-base">まだリクエストはありません</p>
            <p className="text-sm mt-2">プロフィールを充実させると<br />いいねが届きやすくなります</p>
          </div>
        ) : (
          pendingRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onSkip={() => handleSkip(request.id)}
            />
          ))
        )}
      </section>
    </div>
  );
}

function RequestCard({
  request,
  onSkip,
}: {
  request: LikeRequest;
  onSkip: () => void;
}) {
  const { fromUser, commonTags, createdAt } = request;

  return (
    <article className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
      <div className="flex gap-3 p-4">
        {/* Photo */}
        <Link
          href={`/users/${fromUser.id}`}
          className="shrink-0"
          aria-label={`${fromUser.nickname}さんのプロフィールを見る`}
        >
          <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-[#F8F8F8]">
            <Image
              src={fromUser.photoUrls[0]}
              alt={`${fromUser.nickname}さん`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <h2 className="font-bold text-[#333333]">{fromUser.nickname}</h2>
            <span className="text-xs text-[#888888] shrink-0 ml-2">
              {formatRelativeTime(createdAt)}
            </span>
          </div>
          <p className="text-xs text-[#888888] mt-0.5">
            {fromUser.age}歳・{fromUser.area}
          </p>

          {/* Common tags */}
          {commonTags.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center gap-1 mb-1.5">
                <Sparkles size={11} className="text-[#1ABC9C]" />
                <span className="text-[11px] font-semibold text-[#1ABC9C]">
                  共通点 {commonTags.length}個
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {commonTags.slice(0, 3).map((tag) => (
                  <TagBadge key={tag.id} tag={tag} variant="common" size="sm" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-[#E5E5E5]">
        <button
          onClick={onSkip}
          aria-label={`${fromUser.nickname}さんをスキップ`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm text-[#888888] hover:bg-[#F8F8F8] transition-colors border-r border-[#E5E5E5]"
        >
          <X size={16} />
          スキップ
        </button>
        <Link
          href={`/users/${fromUser.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm text-[#FF6B6B] font-semibold hover:bg-[#FFF0F0] transition-colors"
          aria-label={`${fromUser.nickname}さんのプロフィールを見て承認する`}
        >
          <Eye size={16} />
          プロフィールを見る
        </Link>
      </div>
    </article>
  );
}
