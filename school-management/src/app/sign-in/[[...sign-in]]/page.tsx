"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Users,
  AlertCircle,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useApp();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      if (res.success) {
        const u = username.toLowerCase();
        const userRole =
          u.includes("teacher") || u.includes("tch") || u === "sarah.j"
            ? "teacher"
            : u.includes("std") || u === "lucas.b"
            ? "student"
            : u.includes("thomas") || u.includes("parent")
            ? "parent"
            : "admin";

        router.replace(`/${userRole}`);
      } else {
        setErrorMsg(res.message || "Invalid credentials.");
        setLoading(false);
      }
    }, 400);
  };

  const quickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center p-4">
      {/* INSTITUTION HEADER */}
      <div className="text-center mb-6 flex flex-col items-center animate-in fade-in">
        <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xl mb-3 ring-4 ring-white/10">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          SchooLama Portal Login
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
          Authorized Academic Portal. Sign in using your school-issued ID &amp; password.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* USERNAME / ID */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              Username or Student/Teacher ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. admin, STD-2024-001, sarah.j"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition text-xs font-medium text-gray-800"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition text-xs font-medium text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] mt-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* QUICK FILL DEMO PILLS */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">
            ⚡ Quick 1-Click Role Login:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => quickFill("admin", "admin123")}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-left transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <div>
                <p className="font-bold text-[11px]">Admin</p>
                <p className="text-[9px] text-purple-600">admin / admin123</p>
              </div>
            </button>

            <button
              onClick={() => quickFill("sarah.j", "teacher123")}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-left transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-700" />
              <div>
                <p className="font-bold text-[11px]">Teacher</p>
                <p className="text-[9px] text-blue-600">sarah.j / teacher123</p>
              </div>
            </button>

            <button
              onClick={() => quickFill("lucas.b", "student123")}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-left transition flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <div>
                <p className="font-bold text-[11px]">Student (10A)</p>
                <p className="text-[9px] text-amber-600">lucas.b / student123</p>
              </div>
            </button>

            <button
              onClick={() => quickFill("thomas.b", "parent123")}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-left transition flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-700" />
              <div>
                <p className="font-bold text-[11px]">Parent</p>
                <p className="text-[9px] text-emerald-600">thomas.b / parent123</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER NOTICE */}
      <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-400">
        <Lock className="w-3.5 h-3.5 text-emerald-400" />
        <span>Official credentials only. Accounts managed by School Administration.</span>
      </div>
    </div>
  );
}