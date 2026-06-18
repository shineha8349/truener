"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import type { IcebreakerSuggestion } from "@/types";

type IcebreakerSuggestionProps = {
  suggestions: IcebreakerSuggestion[];
  onSelect: (text: string) => void;
};

export default function IcebreakerSuggestionCard({
  suggestions,
  onSelect,
}: IcebreakerSuggestionProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mx-4 mb-3 bg-gradient-to-br from-[#FFF0F0] to-[#FFF8F0] border border-[#FF6B6B]/20 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3"
        aria-expanded={expanded}
        aria-controls="icebreaker-list"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#FF6B6B]" />
          <span className="text-sm font-semibold text-[#FF6B6B]">
            最初のひとことを提案
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-[#FF6B6B]" />
        ) : (
          <ChevronDown size={16} className="text-[#FF6B6B]" />
        )}
      </button>

      {expanded && (
        <div id="icebreaker-list" className="px-3 pb-3 space-y-2">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => onSelect(suggestion.text)}
              className="w-full text-left bg-white rounded-xl px-3 py-2.5 border border-[#E5E5E5] hover:border-[#FF6B6B] hover:shadow-sm transition-all"
              aria-label={`提案${i + 1}: ${suggestion.text}`}
            >
              <div className="flex items-start gap-2">
                <span className="text-base leading-none mt-0.5">{suggestion.emoji}</span>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {suggestion.text}
                </p>
              </div>
            </button>
          ))}
          <p className="text-[10px] text-[#888888] text-center pt-1">
            タップすると入力欄にセットされます
          </p>
        </div>
      )}
    </div>
  );
}
