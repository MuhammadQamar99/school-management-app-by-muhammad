"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const router = useRouter();
  const { role } = useApp();

  useEffect(() => {
    router.replace(`/${role}`);
  }, [role, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Loading SchooLama Dashboard...</p>
      </div>
    </div>
  );
}
