import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { mockMatches, formatRelativeTime } from "@/lib/mock-data";

export default function ChatListPage() {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] z-40">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-[#333333]">チャット</h1>
          <p className="text-xs text-[#888888] mt-0.5">
            マッチング中 {mockMatches.length}人
          </p>
        </div>
      </header>

      <section aria-label="チャット一覧">
        {mockMatches.length === 0 ? (
          <div className="text-center py-20 text-[#888888] px-6">
            <MessageCircle size={48} className="mx-auto mb-4 text-[#E5E5E5]" />
            <p className="text-base">まだマッチングがありません</p>
            <p className="text-sm mt-2">
              ホームで気になる相手にいいねを送ってみましょう
            </p>
          </div>
        ) : (
          <ul>
            {mockMatches.map((match) => (
              <li key={match.id}>
                <Link
                  href={`/chats/${match.id}`}
                  className="flex items-center gap-3 px-4 py-4 hover:bg-[#F8F8F8] transition-colors border-b border-[#E5E5E5]"
                  aria-label={`${match.partner.nickname}さんとのチャット${match.unreadCount > 0 ? `、未読${match.unreadCount}件` : ""}`}
                >
                  {/* Photo */}
                  <div className="relative shrink-0">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#F8F8F8]">
                      <Image
                        src={match.partner.photoUrls[0]}
                        alt={`${match.partner.nickname}さん`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#333333] text-sm">
                        {match.partner.nickname}
                      </span>
                      {match.lastMessageAt && (
                        <span className="text-xs text-[#888888] shrink-0 ml-2">
                          {formatRelativeTime(match.lastMessageAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {match.isFirstMessageSent && match.lastMessage ? (
                        <p className="text-xs text-[#888888] truncate">
                          {match.lastMessage}
                        </p>
                      ) : (
                        <p className="text-xs text-[#FF6B6B] font-medium">
                          ✨ 最初のメッセージを送ってみましょう
                        </p>
                      )}
                      {match.unreadCount > 0 && (
                        <span
                          className="shrink-0 bg-[#FF6B6B] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                          aria-label={`未読${match.unreadCount}件`}
                        >
                          {match.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
