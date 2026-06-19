import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, MessageCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] via-[#FF8C69] to-[#FF6B6B] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-20 right-5 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-32 right-20 w-20 h-20 rounded-full bg-white" />
        </div>
        <div className="relative max-w-lg mx-auto px-6 pt-16 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Sparkles size={14} />
            SNS × 趣味でリアルな相性を発見
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Truener
          </h1>
          <p className="text-lg text-white/90 mb-2 font-medium">
            趣味で繋がる、本気の出会い
          </p>
          <p className="text-sm text-white/80 leading-relaxed">
            Instagramの趣味データをAIが分析し、
            <br />
            本当に気が合う相手と出会えるマッチングアプリ
          </p>
        </div>
      </div>

      {/* CTA Card */}
      <div className="max-w-lg mx-auto px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-4 rounded-full transition-colors text-base"
            aria-label="無料で登録する"
          >
            無料ではじめる
          </Link>
          <p className="text-center text-xs text-[#888888] mt-3">
            女性は完全無料。男性は20いいねまで無料。
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-lg mx-auto px-6 py-12 space-y-6">
        <h2 className="text-lg font-bold text-[#333333] text-center mb-8">
          Truenerが選ばれる理由
        </h2>

        {[
          {
            icon: Sparkles,
            color: "text-[#FF6B6B]",
            bg: "bg-[#FFF0F0]",
            title: "AIが趣味タグを自動生成",
            desc: "Instagramと連携するだけで、「音楽好き」「カフェ巡り」などのタグが自動で設定され、共通点の多い相手を見つけやすくなります。",
          },
          {
            icon: Heart,
            color: "text-[#1ABC9C]",
            bg: "bg-[#e8faf6]",
            title: "女性ファーストな設計",
            desc: "メッセージは女性から。いいねリクエスト承認制で、会いたい相手だけと繋がれます。女性は完全無料で利用できます。",
          },
          {
            icon: ShieldCheck,
            color: "text-[#3B82F6]",
            bg: "bg-[#EFF6FF]",
            title: "年齢確認で安心",
            desc: "全ユーザーに公的証明書による年齢確認を実施。目的外利用や未成年の利用を防ぎ、真剣な出会いの場を守ります。",
          },
          {
            icon: MessageCircle,
            color: "text-[#F59E0B]",
            bg: "bg-[#FFFBEB]",
            title: "AIが会話のきっかけを提案",
            desc: "共通のタグをもとに、最初のメッセージ候補をAIが自動で提案。話題に困ることなく自然に会話がスタートできます。",
          },
        ].map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <div className={`shrink-0 w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center`}>
              <feature.icon size={22} className={feature.color} />
            </div>
            <div>
              <h3 className="font-semibold text-[#333333] text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-[#888888] leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="max-w-lg mx-auto px-6 pb-12">
        <h2 className="text-lg font-bold text-[#333333] text-center mb-6">料金プラン</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F8F8F8] rounded-2xl p-5 border border-[#E5E5E5]">
            <p className="text-xs text-[#888888] mb-1">男性</p>
            <p className="text-2xl font-bold text-[#333333]">
              ¥6,000
              <span className="text-sm font-normal text-[#888888]">/月</span>
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-[#555555]">
              <li>✓ 20いいねまで無料</li>
              <li>✓ メッセージ送受信</li>
              <li>✓ AIタグマッチング</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8C69]/10 rounded-2xl p-5 border border-[#FF6B6B]/30">
            <p className="text-xs text-[#FF6B6B] font-semibold mb-1">女性</p>
            <p className="text-2xl font-bold text-[#FF6B6B]">
              完全無料
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-[#555555]">
              <li>✓ いいね承認制</li>
              <li>✓ 女性から最初のメッセージ</li>
              <li>✓ AIアイスブレイカー</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-lg mx-auto px-6 pb-16 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold px-8 py-4 rounded-full transition-colors"
        >
          <Heart size={18} fill="white" />
          無料で始める
        </Link>
        <p className="text-xs text-[#888888] mt-3">登録は1分で完了</p>
      </div>
    </div>
  );
}
