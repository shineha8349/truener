"use client";

import { useState } from "react";
import Image from "next/image";
import LogoutButton from "@/components/auth/LogoutButton";
import { Camera, Edit2, ShieldCheck, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Crown } from "lucide-react";
import { mockCurrentUser } from "@/lib/mock-data";
import TagBadge from "@/components/ui/TagBadge";

export default function MyPage() {
  const user = mockCurrentUser;
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(user.bio);

  return (
    <div className="pb-6">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-[#333333]">マイページ</h1>
          <button
            onClick={() => setEditMode(!editMode)}
            aria-label={editMode ? "編集を終了" : "プロフィールを編集"}
            className="flex items-center gap-1.5 text-sm text-[#FF6B6B] font-medium py-1.5 px-3 rounded-full hover:bg-[#FFF0F0] transition-colors"
          >
            <Edit2 size={14} />
            {editMode ? "完了" : "編集"}
          </button>
        </div>
      </header>

      {/* Profile hero */}
      <div className="bg-white px-4 pt-6 pb-5 border-b border-[#E5E5E5]">
        <div className="flex items-start gap-4">
          {/* Photo */}
          <div className="relative shrink-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#F8F8F8]">
              <Image
                src={user.photoUrls[0]}
                alt="プロフィール写真"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            {editMode && (
              <button
                aria-label="写真を変更"
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-sm"
              >
                <Camera size={13} className="text-white" />
              </button>
            )}
          </div>

          {/* Basic info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#333333]">{user.nickname}</h2>
              {user.isAgeVerified && (
                <ShieldCheck size={16} className="text-[#1ABC9C]" aria-label="年齢確認済み" />
              )}
            </div>
            <p className="text-sm text-[#888888] mt-0.5">
              {user.age}歳・{user.area}
            </p>
            {user.gender === "female" && (
              <span className="inline-block mt-1.5 text-[11px] bg-[#FFF0F0] text-[#FF6B6B] border border-[#FF6B6B]/30 rounded-full px-2.5 py-0.5 font-medium">
                女性・完全無料
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-5 pt-4 border-t border-[#E5E5E5]">
          {[
            { label: "マッチング", value: "2" },
            { label: "いいね受信", value: "8" },
            { label: "タグ数", value: String(user.tags.length) },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 text-center">
              <p className="text-xl font-bold text-[#333333]">{stat.value}</p>
              <p className="text-[11px] text-[#888888] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white px-4 py-5 mt-3 border-y border-[#E5E5E5]">
        <h3 className="text-sm font-semibold text-[#333333] mb-2">自己紹介</h3>
        {editMode ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={500}
            rows={4}
            aria-label="自己紹介"
            className="w-full bg-[#F8F8F8] rounded-xl px-3 py-2.5 text-sm text-[#333333] outline-none focus:ring-2 focus:ring-[#FF6B6B]/30 resize-none"
          />
        ) : (
          <p className="text-sm text-[#555555] leading-relaxed">{bio}</p>
        )}
      </div>

      {/* Tags */}
      <div className="bg-white px-4 py-5 mt-3 border-y border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[#333333]">趣味タグ</h3>
          {editMode && (
            <button className="text-xs text-[#FF6B6B] font-medium">
              + タグを追加
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {user.tags.map((tag) => (
            <div key={tag.id} className="relative">
              <TagBadge tag={tag} />
              {editMode && (
                <button
                  aria-label={`${tag.name}タグを削除`}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#888888] rounded-full flex items-center justify-center text-white text-[10px] leading-none"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings menu */}
      <div className="mt-3">
        <p className="px-4 py-2 text-xs font-semibold text-[#888888] uppercase tracking-wider">
          設定
        </p>
        <div className="bg-white border-y border-[#E5E5E5]">
          {[
            {
              icon: ShieldCheck,
              label: "年齢確認",
              sublabel: user.isAgeVerified ? "確認済み ✓" : "未確認",
              color: user.isAgeVerified ? "text-[#1ABC9C]" : "text-[#FF6B6B]",
              iconColor: "text-[#1ABC9C]",
            },
            {
              icon: Crown,
              label: "プランの変更",
              sublabel: user.gender === "female" ? "完全無料" : "フリープラン",
              color: "text-[#888888]",
              iconColor: "text-[#F59E0B]",
            },
            {
              icon: CreditCard,
              label: "お支払い設定",
              sublabel: "",
              color: "text-[#888888]",
              iconColor: "text-[#888888]",
            },
            {
              icon: Bell,
              label: "通知設定",
              sublabel: "",
              color: "text-[#888888]",
              iconColor: "text-[#888888]",
            },
            {
              icon: HelpCircle,
              label: "ヘルプ・お問い合わせ",
              sublabel: "",
              color: "text-[#888888]",
              iconColor: "text-[#888888]",
            },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8F8F8] transition-colors border-b border-[#E5E5E5] last:border-0"
              aria-label={item.label}
            >
              <item.icon size={20} className={`shrink-0 ${item.iconColor}`} />
              <span className="flex-1 text-sm text-[#333333] text-left">
                {item.label}
              </span>
              {item.sublabel && (
                <span className={`text-xs ${item.color}`}>{item.sublabel}</span>
              )}
              <ChevronRight size={16} className="text-[#E5E5E5]" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="bg-white border-y border-[#E5E5E5] mt-3">
          <LogoutButton />
        </div>
      </div>

      <p className="text-center text-xs text-[#888888] mt-6">
        Truener v0.1.0 — 利用規約 · プライバシーポリシー
      </p>
    </div>
  );
}
