"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/types";
import { ShieldCheck, GraduationCap, BookOpen, Users, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const RoleSwitcher = () => {
  const { role, setRole, showRoleBanner, setShowRoleBanner } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  if (!showRoleBanner) {
    return (
      <button
        onClick={() => setShowRoleBanner(true)}
        className="fixed bottom-4 right-4 z-40 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-black transition-all"
      >
        <Sparkles className="w-3.5 h-3.5 text-lamaYellow" />
        Role: <span className="capitalize text-lamaSky font-bold">{role}</span>
      </button>
    );
  }

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // If currently on a dashboard route, redirect to that role's dashboard
    if (
      pathname === "/admin" ||
      pathname === "/teacher" ||
      pathname === "/student" ||
      pathname === "/parent"
    ) {
      router.push(`/${newRole}`);
    }
  };

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
    {
      role: "admin",
      label: "Admin",
      icon: <ShieldCheck className="w-4 h-4" />,
      desc: "Full school control, statistics, management & CRUD",
      color: "border-lamaPurple bg-lamaPurpleLight text-purple-900",
    },
    {
      role: "teacher",
      label: "Teacher",
      icon: <BookOpen className="w-4 h-4" />,
      desc: "Teacher timetable, class rosters, exams & announcements",
      color: "border-lamaSky bg-lamaSkyLight text-blue-900",
    },
    {
      role: "student",
      label: "Student",
      icon: <GraduationCap className="w-4 h-4" />,
      desc: "Student schedule, assignments, results & calendar",
      color: "border-lamaYellow bg-lamaYellowLight text-amber-900",
    },
    {
      role: "parent",
      label: "Parent",
      icon: <Users className="w-4 h-4" />,
      desc: "Child's attendance, performance reports & schedule",
      color: "border-emerald-300 bg-emerald-50 text-emerald-900",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-md border-b border-indigo-800/40 relative z-30">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 font-bold tracking-wide text-lamaYellow">
          <Sparkles className="w-4 h-4 text-lamaYellow animate-pulse" />
          Interactive Role Preview:
        </span>
        <span className="text-slate-300 hidden md:inline">
          Switch roles to test permissions & dashboards:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((r) => {
            const isActive = role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleRoleChange(r.role)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all border ${
                  isActive
                    ? `${r.color} shadow-sm scale-105 ring-1 ring-white/50`
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
                title={r.desc}
              >
                {r.icon}
                <span className="capitalize">{r.label}</span>
                {isActive && <span className="text-[10px] ml-0.5 bg-white/40 px-1 rounded-sm">Active</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={`/${role}`}
          className="text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded border border-white/20 transition-all font-medium"
        >
          Go to {role.toUpperCase()} View →
        </Link>
        <button
          onClick={() => setShowRoleBanner(false)}
          className="text-slate-400 hover:text-white p-0.5 rounded"
          title="Minimize switcher"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
