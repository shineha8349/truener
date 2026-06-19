import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles, ShieldCheck, MessageCircle, Star, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Navigation ── */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="text-2xl font-black italic tracking-tight text-[#222]">
          Truener
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-[#555] hover:text-[#333] transition-colors font-medium hidden sm:block"
          >
            ログイン
          </Link>
          <Link
            href="/sign-up"
            className="text-sm bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            無料で登録
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 pt-4 lg:pt-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="order-2 lg:order-1">
            <p className="text-[#FF6B6B] text-xs font-bold tracking-[0.2em] uppercase mb-5">
              ― 婚活特化型マッチングアプリ ―
            </p>
            <h1 className="text-5xl lg:text-6xl font-black text-[#1a1a1a] leading-[1.15] mb-6 tracking-tight">
              もう時間を<br />無駄にしない。
            </h1>
            <p className="text-[#555] text-[15px] leading-[1.9] mb-8">
              InstagramのSNSデータをAIが分析し、<br />
              本当に気が合う相手を自動でマッチング。<br />
              共通の趣味・価値観を数値で可視化するから、<br />
              初対面でも会話が弾みます。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold py-4 px-8 rounded-full transition-all text-base shadow-lg shadow-[#FF6B6B]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart size={18} fill="white" />
                無料ではじめる
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 border-2 border-[#E5E5E5] hover:border-[#FF6B6B] text-[#555] hover:text-[#FF6B6B] font-semibold py-4 px-8 rounded-full transition-all text-base"
              >
                ログインはこちら
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {["女性は完全無料", "男性は20いいねまで無料", "登録は1分"].map((t) => (
                <span key={t} className="flex items-center gap-1 text-xs text-[#888]">
                  <CheckCircle size={12} className="text-[#1ABC9C]" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Photo + Phone mockup */}
          <div className="order-1 lg:order-2 relative">
            {/* Couple photo */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-couple.png"
                alt="笑顔のカップル"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Phone mockup card */}
            <div className="absolute bottom-6 -right-2 lg:-right-8 w-44 bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F0F0F0]">
              <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8C69] px-3 py-2 flex items-center gap-1.5">
                <Heart size={11} className="text-white" fill="white" />
                <span className="text-white text-[10px] font-bold">マッチング成立！</span>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/images/profiles/kenta-1.png"
                      alt="Yusuke"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-[#222]">Yusuke</p>
                    <p className="text-[9px] text-[#888]">30歳 / 東京</p>
                  </div>
                  <div className="bg-[#FF6B6B] text-white text-[9px] font-black rounded-full w-8 h-8 flex items-center justify-center shrink-0 leading-none">
                    <span>94<br /><span className="text-[7px]">%</span></span>
                  </div>
                </div>
                <p className="text-[8px] text-[#888] font-bold mb-1.5 tracking-wide">共通点 TOP 3</p>
                {["食べ歩き 🍜", "フェス常連 🎤", "カフェ巡り ☕"].map((tag) => (
                  <div
                    key={tag}
                    className="bg-[#FFF0F0] text-[#FF6B6B] text-[8px] rounded-full px-2.5 py-1 mb-1 font-semibold"
                  >
                    {tag}
                  </div>
                ))}
                <button className="w-full mt-2 bg-[#FF6B6B] text-white text-[10px] font-bold py-1.5 rounded-full">
                  詳しくみる
                </button>
              </div>
              {/* Bottom Nav mini */}
              <div className="border-t border-[#F5F5F5] flex justify-around py-2 px-4">
                {["👤", "❤️", "💬"].map((icon) => (
                  <span key={icon} className="text-sm">{icon}</span>
                ))}
              </div>
            </div>

            {/* Stat badge */}
            <div className="absolute top-8 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-[#F5F5F5]">
              <div className="w-9 h-9 bg-[#FFF0F0] rounded-full flex items-center justify-center shrink-0">
                <Star size={15} className="text-[#FF6B6B]" fill="#FF6B6B" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[#888]">マッチング率</p>
                <p className="text-xl font-black text-[#FF6B6B] leading-tight">3.2倍</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof Stats ── */}
      <section className="bg-[#F8F8F8] border-y border-[#EEEEEE]">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "15万+", label: "累計登録者数" },
            { value: "94%", label: "プロフィール確認済み" },
            { value: "3.2倍", label: "他社比マッチング率" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-[#FF6B6B] mb-1">{s.value}</p>
              <p className="text-xs text-[#888] font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-[#FF6B6B] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Features
        </p>
        <h2 className="text-center text-3xl font-black text-[#1a1a1a] mb-12">
          Truenerが選ばれる理由
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              color: "text-[#FF6B6B]",
              bg: "bg-[#FFF0F0]",
              title: "AIが趣味タグを自動生成",
              desc: "Instagramと連携するだけで趣味・嗜好タグが自動で設定。共通点の多い相手を見つけやすくなります。",
            },
            {
              icon: Heart,
              color: "text-[#1ABC9C]",
              bg: "bg-[#e8faf6]",
              title: "女性ファーストな設計",
              desc: "メッセージは女性から。いいねリクエスト承認制で、会いたい相手だけと繋がれます。女性は完全無料。",
            },
            {
              icon: ShieldCheck,
              color: "text-[#3B82F6]",
              bg: "bg-[#EFF6FF]",
              title: "年齢確認で安心",
              desc: "全ユーザーに公的証明書による年齢確認を実施。真剣な出会いの場を守ります。",
            },
            {
              icon: MessageCircle,
              color: "text-[#F59E0B]",
              bg: "bg-[#FFFBEB]",
              title: "AIがトークを提案",
              desc: "共通タグをもとにAIが最初のメッセージ候補を自動提案。話題に困らず自然に会話がスタート。",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-[#F0F0F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <f.icon size={22} className={f.color} />
              </div>
              <h3 className="font-bold text-[#222] text-sm mb-2">{f.title}</h3>
              <p className="text-xs text-[#888] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Profile Preview ── */}
      <section className="bg-[#F8F8F8] border-y border-[#EEEEEE] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-[#FF6B6B] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Members
          </p>
          <h2 className="text-center text-3xl font-black text-[#1a1a1a] mb-10">
            こんな人たちが使っています
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                src: "/images/profiles/sakura-1.png",
                name: "さくら",
                age: 28,
                area: "東京",
                tags: ["カフェ巡り", "音楽好き"],
              },
              {
                src: "/images/profiles/kenta-1.png",
                name: "健太",
                age: 31,
                area: "神奈川",
                tags: ["登山", "映画好き"],
              },
              {
                src: "/images/profiles/aoi-1.png",
                name: "あおい",
                age: 26,
                area: "大阪",
                tags: ["旅行好き", "グルメ"],
              },
              {
                src: "/images/profiles/miki-1.png",
                name: "みき",
                age: 30,
                area: "東京",
                tags: ["読書", "美術館"],
              },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F0F0F0]">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-[#222] text-sm">{p.name} <span className="text-[#888] font-normal text-xs">{p.age}歳 · {p.area}</span></p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[9px] bg-[#FFF0F0] text-[#FF6B6B] px-2 py-0.5 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-center text-[#FF6B6B] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Pricing
        </p>
        <h2 className="text-center text-3xl font-black text-[#1a1a1a] mb-10">料金プラン</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <div className="bg-[#F8F8F8] rounded-2xl p-7 border border-[#E5E5E5]">
            <p className="text-xs text-[#888] font-semibold mb-2">男性プラン</p>
            <p className="text-4xl font-black text-[#1a1a1a] mb-1">
              ¥6,000<span className="text-base font-normal text-[#888]">/月</span>
            </p>
            <p className="text-xs text-[#1ABC9C] font-semibold mb-5">✓ 20いいねまで無料</p>
            <ul className="space-y-2.5">
              {["無制限のいいね送信", "メッセージ送受信", "AIタグマッチング", "プロフィール強調表示"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#555]">
                  <CheckCircle size={14} className="text-[#1ABC9C] shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8C69] rounded-2xl p-7 text-white relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              女性限定
            </div>
            <p className="text-xs text-white/80 font-semibold mb-2">女性プラン</p>
            <p className="text-4xl font-black mb-1">
              完全無料
            </p>
            <p className="text-xs text-white/80 font-semibold mb-5">全機能が無料で使えます</p>
            <ul className="space-y-2.5">
              {["いいね承認制（安心）", "女性からファーストメッセージ", "AIアイスブレイカー提案", "年齢確認済みのみと交流"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle size={14} className="text-white shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-gradient-to-br from-[#FF6B6B] via-[#FF7A7A] to-[#FF8C69] py-20 px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
          本気の出会いを、はじめよう。
        </h2>
        <p className="text-white/80 mb-8 text-sm">登録は1分。まずは無料でお試しください。</p>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 bg-white text-[#FF6B6B] hover:bg-[#FFF0F0] font-bold px-10 py-4 rounded-full transition-all text-base shadow-xl hover:scale-105 active:scale-[0.98]"
        >
          <Heart size={18} fill="#FF6B6B" />
          無料ではじめる
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-lg font-black italic text-[#333]">Truener</span>
        <p className="text-xs text-[#888]">© 2026 Truener. 利用規約 · プライバシーポリシー</p>
      </footer>
    </div>
  );
}
