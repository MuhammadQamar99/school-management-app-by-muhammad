import React from "react";
import Menu from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ROLE SWITCHER TOP BAR */}
      <RoleSwitcher />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-[16%] md:w-[9%] lg:w-[17%] xl:w-[15%] p-3 md:p-4 bg-white border-r border-gray-100 flex flex-col overflow-y-auto shrink-0 shadow-xs">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2 py-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-gray-900 leading-tight">
                SchooLama
              </span>
              <span className="text-[10px] text-gray-400 font-medium">LMS Dashboard</span>
            </div>
          </Link>
          <Menu />
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="w-[84%] md:w-[91%] lg:w-[83%] xl:w-[85%] bg-[#F7F8FA] overflow-y-auto flex flex-col">
          <Navbar />
          <main className="p-3 md:p-5 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
