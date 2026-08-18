"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { setRole } = useApp();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    // Clerk metadata se role check karein
    const userRole = (user?.publicMetadata as { role?: string })?.role || "student";
    setRole(userRole as any);

    // Direct us user k dashboard par bhej dein
    router.replace(`/${userRole}`);
  }, [isLoaded, isSignedIn, user, router, setRole]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-300">
          Verifying school credentials &amp; loading your portal...
        </p>
      </div>
    </div>
  );
}