"use client";

import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import {
  mockMatches,
  mockMessages,
  mockCurrentUser,
  mockIcebreakerSuggestions,
  formatTime,
} from "@/lib/mock-data";
import type { Message } from "@/types";
import IcebreakerSuggestionCard from "@/components/chat/IcebreakerSuggestion";

export default function ChatDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = use(params);
  const router = useRouter();

  const match = mockMatches.find((m) => m.id === matchId) ?? mockMatches[0];
  const [messages, setMessages] = useState<Message[]>(
    mockMessages.filter((m) => m.matchId === matchId || matchId === "match-1")
  );
  const [inputText, setInputText] = useState("");
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(
    match.isFirstMessageSent
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current user is female (sender of first message)
  const isCurrentUserFemale = mockCurrentUser.gender === "female";
  const canSendMessage =
    isCurrentUserFemale ? true : isFirstMessageSent;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || !canSendMessage) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      matchId,
      senderId: mockCurrentUser.id,
      content: text,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsFirstMessageSent(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleIcebreakerSelect = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-[#E5E5E5] z-40">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <button
            onClick={() => router.back()}
            aria-label="戻る"
            className="p-1.5 -ml-1.5 rounded-full hover:bg-[#F8F8F8] transition-colors"
          >
            <ArrowLeft size={22} className="text-[#333333]" />
          </button>
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F8F8F8] shrink-0">
            <Image
              src={match.partner.photoUrls[0]}
              alt={match.partner.nickname}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-semibold text-[#333333] text-sm leading-tight">
              {match.partner.nickname}さん
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#1ABC9C]" />
              <span className="text-[11px] text-[#888888]">接続中</span>
            </div>
          </div>
        </div>
        {/* Common tags bar */}
        {match.commonTags.length > 0 && (
          <div className="px-4 pb-2.5 max-w-lg mx-auto">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              <Sparkles size={12} className="text-[#1ABC9C] shrink-0" />
              <span className="text-[11px] text-[#1ABC9C] font-medium shrink-0">
                共通点:
              </span>
              {match.commonTags.map((tag) => (
                <span
                  key={tag.id}
                  className="shrink-0 text-[11px] bg-[#e8faf6] text-[#1ABC9C] px-2 py-0.5 rounded-full border border-[#1ABC9C]/20"
                >
                  {tag.emoji} {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-lg mx-auto w-full">
        <div className="px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-6 text-[#888888]">
              <p className="text-xs">マッチングが成立しました 🎉</p>
              <p className="text-xs mt-1">最初のメッセージを送ってみましょう</p>
            </div>
          )}
          {messages.map((msg) => {
            const isMine = msg.senderId === mockCurrentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isMine
                      ? "bg-[#FF6B6B] text-white rounded-br-sm"
                      : "bg-white text-[#333333] border border-[#E5E5E5] rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-[#888888]">
                    {formatTime(msg.createdAt)}
                  </span>
                  {isMine && (
                    <span className="text-[10px] text-[#888888]">
                      {msg.isRead ? "✓既読" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Icebreaker (female only, before first message) */}
      {isCurrentUserFemale && !isFirstMessageSent && (
        <div className="shrink-0 max-w-lg mx-auto w-full">
          <IcebreakerSuggestionCard
            suggestions={mockIcebreakerSuggestions}
            onSelect={handleIcebreakerSelect}
          />
        </div>
      )}

      {/* Male restriction notice */}
      {!isCurrentUserFemale && !isFirstMessageSent && (
        <div className="shrink-0 max-w-lg mx-auto w-full mx-4 mb-3 px-4">
          <div className="bg-[#e8faf6] border border-[#1ABC9C]/20 rounded-xl px-4 py-3 mx-4 mb-3">
            <p className="text-xs text-[#1ABC9C] text-center">
              💬 Truenerは女性からメッセージを送るシステムです。
              <br />
              相手からのメッセージをお待ちください。
            </p>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="shrink-0 bg-white border-t border-[#E5E5E5] max-w-lg mx-auto w-full">
        <div className="flex items-end gap-2 px-4 py-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!canSendMessage}
            placeholder={
              canSendMessage
                ? "メッセージを入力..."
                : "相手からのメッセージをお待ちください"
            }
            rows={1}
            aria-label="メッセージ入力"
            className="flex-1 resize-none bg-[#F8F8F8] rounded-2xl px-4 py-2.5 text-sm text-[#333333] placeholder:text-[#888888] outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px] max-h-32"
            style={{ lineHeight: "1.5" }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || !canSendMessage}
            aria-label="送信"
            className="shrink-0 w-10 h-10 bg-[#FF6B6B] disabled:bg-[#E5E5E5] rounded-full flex items-center justify-center transition-colors"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
