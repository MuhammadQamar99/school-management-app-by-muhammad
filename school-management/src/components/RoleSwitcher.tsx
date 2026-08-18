"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, Lock } from "lucide-react";

export const RoleSwitcher = () => {
  const { role } = useApp();

  // Ab koi bhi user (Student/Teacher/Parent) khud se role switch nahi kar sakta
  return (
    <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex items-center justify-between border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-bold text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          SchooLama Academic Portal
        </span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">Authenticated Session:</span>
        <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded font-bold uppercase text-[10px] border border-purple-700/50">
          {role}
        </span>
      </div>

      <div className="flex items-center gap-1 text-[11px] text-slate-400">
        <Lock className="w-3 h-3 text-emerald-400" />
        <span className="hidden sm:inline">Role-Based Access Protected</span>
      </div>
    </div>
  );
};
export default RoleSwitcher;