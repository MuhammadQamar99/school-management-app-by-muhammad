"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Home,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  School,
  Layers,
  FileCheck,
  ClipboardList,
  Award,
  CalendarCheck,
  CalendarDays,
  MessageSquare,
  Megaphone,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  visible: string[];
}

export const Menu = () => {
  const pathname = usePathname();
  const { role } = useApp();

  const menuItems: { title: string; items: MenuItem[] }[] = [
    {
      title: "MENU",
      items: [
        {
          icon: <Home className="w-5 h-5" />,
          label: "Dashboard",
          href: `/${role}`,
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <UserCheck className="w-5 h-5" />,
          label: "Teachers",
          href: "/list/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon: <GraduationCap className="w-5 h-5" />,
          label: "Students",
          href: "/list/students",
          visible: ["admin", "teacher"],
        },
        {
          icon: <Users className="w-5 h-5" />,
          label: "Parents",
          href: "/list/parents",
          visible: ["admin", "teacher"],
        },
        {
          icon: <BookOpen className="w-5 h-5" />,
          label: "Subjects",
          href: "/list/subjects",
          visible: ["admin"],
        },
        {
          icon: <School className="w-5 h-5" />,
          label: "Classes",
          href: "/list/classes",
          visible: ["admin", "teacher"],
        },
        {
          icon: <Layers className="w-5 h-5" />,
          label: "Lessons",
          href: "/list/lessons",
          visible: ["admin", "teacher"],
        },
        {
          icon: <FileCheck className="w-5 h-5" />,
          label: "Exams",
          href: "/list/exams",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <ClipboardList className="w-5 h-5" />,
          label: "Assignments",
          href: "/list/assignments",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Award className="w-5 h-5" />,
          label: "Results",
          href: "/list/results",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <CalendarCheck className="w-5 h-5" />,
          label: "Attendance",
          href: "/list/attendance",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <CalendarDays className="w-5 h-5" />,
          label: "Events",
          href: "/list/events",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <MessageSquare className="w-5 h-5" />,
          label: "Messages",
          href: "/list/messages",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Megaphone className="w-5 h-5" />,
          label: "Announcements",
          href: "/list/announcements",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: <User className="w-5 h-5" />,
          label: "Profile",
          href: "/profile",
          visible: ["admin", "teacher", "student", "parent"],
        },
        {
          icon: <Settings className="w-5 h-5" />,
          label: "Settings",
          href: "/settings",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
  ];

  return (
    <div className="mt-4 text-sm flex flex-col gap-2 pb-6">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-1" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-bold text-[11px] my-2 tracking-wider px-2">
            {section.title}
          </span>
          {section.items.map((item) => {
            if (item.visible.includes(role)) {
              const isActive =
                item.href === `/${role}`
                  ? pathname === `/${role}` || (pathname === "/" && role === "admin")
                  : pathname.startsWith(item.href);

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center justify-center lg:justify-start gap-3 py-2 px-2.5 rounded-lg transition-all text-gray-600 hover:bg-lamaSkyLight hover:text-blue-900 group ${
                    isActive ? "bg-lamaSky text-blue-950 font-semibold shadow-xs" : ""
                  }`}
                  title={item.label}
                >
                  <span className={`transition-transform group-hover:scale-110 ${isActive ? "text-blue-900" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span className="hidden lg:block text-xs font-medium tracking-tight">
                    {item.label}
                  </span>
                </Link>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};
export default Menu;
