import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <main className="max-w-lg mx-auto pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
