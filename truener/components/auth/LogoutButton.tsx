"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#FFF0F0] transition-colors text-[#FF6B6B]"
      aria-label="ログアウト"
    >
      <LogOut size={20} className="shrink-0" />
      <span className="text-sm font-medium">ログアウト</span>
    </button>
  );
}
