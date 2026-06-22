import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black italic text-[#222] mb-2">Truener</h1>
          <p className="text-[#888] text-sm">趣味で繋がる、本気の出会い</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-xl border border-[#F0F0F0] rounded-3xl",
              headerTitle: "text-[#1a1a1a] font-bold",
              formButtonPrimary:
                "bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold rounded-full",
              footerActionLink: "text-[#FF6B6B] hover:text-[#FF5252]",
            },
          }}
        />
      </div>
    </div>
  );
}
