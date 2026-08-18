"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const router = useRouter();
  const { currentUser, role, isAuthenticated } = useApp();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      router.replace(`/${currentUser.role || role}`);
    } else {
      router.replace("/sign-in");
    }
  }, [currentUser, role, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-300">
          Connecting to SchooLama Portal...
        </p>
      </div>
    </div>
  );
}