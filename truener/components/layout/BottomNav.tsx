"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, MessageCircle, User } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  femaleOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: "/home", label: "ホーム", icon: Home },
  { href: "/requests", label: "リクエスト", icon: Heart, badge: 3, femaleOnly: true },
  { href: "/chats", label: "チャット", icon: MessageCircle, badge: 1 },
  { href: "/mypage", label: "マイページ", icon: User },
];

// モックは女性ユーザーとして扱う
const IS_FEMALE = true;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50"
      aria-label="ボトムナビゲーション"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {navItems
          .filter((item) => !item.femaleOnly || IS_FEMALE)
          .map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-4 py-2 relative transition-colors ${
                  isActive ? "text-[#FF6B6B]" : "text-[#888888]"
                }`}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge && item.badge > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 bg-[#FF6B6B] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
                      aria-label={`${item.badge}件の通知`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "text-[#FF6B6B]" : "text-[#888888]"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
      </div>
    </nav>
  );
}
