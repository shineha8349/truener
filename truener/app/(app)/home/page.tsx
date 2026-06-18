import { Bell } from "lucide-react";
import { mockCandidates, mockCurrentUser, getCommonTags } from "@/lib/mock-data";
import CandidateCard from "@/components/candidate/CandidateCard";

export default function HomePage() {
  const candidates = mockCandidates.map((candidate) => ({
    user: candidate,
    commonTags: getCommonTags(mockCurrentUser.tags, candidate.tags),
  }));

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-[#FF6B6B]">Truener</h1>
          <button
            aria-label="通知"
            className="relative p-2 rounded-full hover:bg-[#F8F8F8] transition-colors"
          >
            <Bell size={22} className="text-[#888888]" />
          </button>
        </div>
      </header>

      {/* Candidate list */}
      <section className="px-4 py-4 space-y-4" aria-label="マッチング候補一覧">
        {candidates.length === 0 ? (
          <div className="text-center py-20 text-[#888888]">
            <p className="text-base">今日の候補はここまでです</p>
            <p className="text-sm mt-2">明日また新しい候補が表示されます</p>
          </div>
        ) : (
          candidates.map(({ user, commonTags }) => (
            <CandidateCard key={user.id} user={user} commonTags={commonTags} />
          ))
        )}
      </section>
    </div>
  );
}
