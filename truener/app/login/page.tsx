"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error("ログインエラー:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] via-[#FF8C69] to-[#FF6B6B] flex flex-col items-center justify-center px-6">
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8C69] px-8 py-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-white" fill="white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Truener</h1>
          <p className="text-white/80 text-sm mt-2">趣味で繋がる、本気の出会い</p>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <h2 className="text-center text-lg font-bold text-[#333333] mb-6">
            ログイン / 新規登録
          </h2>

          {/* Google OAuth ボタン */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            aria-label="Googleアカウントでログイン"
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#E5E5E5] hover:border-[#FF6B6B] hover:bg-[#FFF0F0] text-[#333333] font-semibold py-3.5 rounded-2xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#FF6B6B] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
              </svg>
            )}
            {loading ? "リダイレクト中..." : "Googleで続ける"}
          </button>

          <p className="text-center text-xs text-[#888888] mt-4 leading-relaxed">
            ログインすることで
            <span className="text-[#FF6B6B]">利用規約</span>・
            <span className="text-[#FF6B6B]">プライバシーポリシー</span>
            に同意したものとみなされます
          </p>
        </div>

        {/* Features */}
        <div className="border-t border-[#E5E5E5] px-8 py-6 bg-[#F8F8F8] space-y-3">
          {[
            { icon: Sparkles, text: "SNS趣味タグでリアルな相性を発見" },
            { icon: Heart, text: "女性完全無料・ファーストメッセージ制" },
            { icon: ShieldCheck, text: "年齢確認で安心・安全な出会い" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <item.icon size={15} className="text-[#FF6B6B] shrink-0" />
              <span className="text-xs text-[#555555]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-white/60 text-xs mt-6">
        男性は20いいねまで無料でご利用いただけます
      </p>
    </div>
  );
}
