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
  ShieldCheck,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useApp();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (u: string, p: string) => {
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(u, p);
      if (success) {
        const uClean = u.trim().toLowerCase();
        if (uClean === "admin") router.push("/admin");
        else if (uClean === "sarah.j" || uClean === "teacher") router.push("/teacher");
        else if (uClean === "lucas.b" || uClean === "student") router.push("/student");
        else if (uClean === "thomas.b" || uClean === "parent") router.push("/parent");
        else router.push("/admin");
      } else {
        setError("Invalid username or password. Please check your credentials.");
        setIsLoading(false);
      }
    }, 300);
  };

  const handleQuickLogin = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    handleLogin(u, p);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center p-4">
      {/* HEADER */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg mb-3">
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/20 animate-in fade-in zoom-in-95">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(username, password);
          }}
          className="flex flex-col gap-4"
        >
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
              {error}
            </div>
          )}

          {/* USERNAME */}
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              Username or Student/Teacher ID
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin, sarah.j, lucas.b"
              className="p-3 rounded-xl border border-gray-300 bg-gray-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 font-medium text-xs text-gray-800"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="font-bold text-gray-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 font-medium text-xs text-gray-800 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-75 mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* QUICK 1-CLICK ROLE LOGIN CARDS */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-wider flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            QUICK 1-CLICK ROLE LOGIN:
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin("admin", "admin123")}
              className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-left transition flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[11px] text-purple-950 truncate">Admin</p>
                <p className="text-[10px] text-purple-700 font-mono truncate">admin / admin123</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin("sarah.j", "teacher123")}
              className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100 text-left transition flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[11px] text-blue-950 truncate">Teacher</p>
                <p className="text-[10px] text-blue-700 font-mono truncate">sarah.j / teacher123</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin("lucas.b", "student123")}
              className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-left transition flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[11px] text-amber-950 truncate">Student (10A)</p>
                <p className="text-[10px] text-amber-700 font-mono truncate">lucas.b / student123</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin("thomas.b", "parent123")}
              className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-left transition flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[11px] text-emerald-950 truncate">Parent</p>
                <p className="text-[10px] text-emerald-700 font-mono truncate">thomas.b / parent123</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-400">
        <Lock className="w-3.5 h-3.5 text-emerald-400" />
        <span>Official credentials only. Accounts managed by School Administration.</span>
      </div>
    </div>
  );
}