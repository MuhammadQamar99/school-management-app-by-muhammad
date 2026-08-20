"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Search,
  MessageSquare,
  Megaphone,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { role, currentUser, logout, announcements } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = () => {
    logout();
    router.push("/sign-in");
  };

  const displayName = currentUser?.name || (role === "admin" ? "Principal Safak" : "User");
  const displayRole = currentUser?.role || role;
  const displayAvatar =
    currentUser?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-3 py-1.5 w-64 lg:w-80 bg-gray-50 focus-within:ring-lamaPurple focus-within:bg-white transition-all">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search lessons, students, staff..."
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-xs"
        />
        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-mono">⌘K</span>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-4 lg:gap-6 justify-end w-full md:w-auto">
        {/* MESSAGES BUTTON */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifs(false);
              setShowUserMenu(false);
            }}
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border border-gray-200 hover:bg-lamaSkyLight text-gray-600 hover:text-blue-700 transition-colors relative"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              2
            </span>
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 text-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-gray-800">Messages &amp; Inquiries</span>
                <Link
                  href="/list/messages"
                  onClick={() => setShowMessages(false)}
                  className="text-[11px] text-purple-600 hover:underline font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="p-2 rounded-lg bg-lamaSkyLight/60 hover:bg-lamaSkyLight transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Elena Rostova</span>
                    <span className="text-[10px] text-gray-400">10m ago</span>
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                    Updated the syllabus for 10B History test next Wednesday.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ANNOUNCEMENTS BUTTON */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowMessages(false);
              setShowUserMenu(false);
            }}
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border border-gray-200 hover:bg-lamaYellowLight text-gray-600 hover:text-amber-700 transition-colors relative"
            title="Announcements"
          >
            <Megaphone className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-lamaPurple text-purple-900 rounded-full text-[10px] flex items-center justify-center font-bold">
              {announcements.length}
            </span>
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 text-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-gray-800">School Notices</span>
                <Link
                  href="/list/announcements"
                  onClick={() => setShowNotifs(false)}
                  className="text-[11px] text-purple-600 hover:underline font-medium"
                >
                  See all
                </Link>
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-60 overflow-y-auto">
                {announcements.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-2 rounded-lg bg-lamaYellowLight/60 hover:bg-lamaYellowLight transition">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">{item.title}</span>
                      <span className="text-[10px] text-gray-500 bg-white px-1.5 py-0.5 rounded border border-amber-200">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE & LOGOUT DROPDOWN */}
        <div className="relative">
          <div
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifs(false);
              setShowMessages(false);
            }}
            className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-gray-50 transition"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs leading-4 font-semibold text-gray-800">{displayName}</span>
              <div className="flex items-center justify-end gap-1">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    displayRole === "admin"
                      ? "bg-lamaPurpleLight text-purple-800"
                      : displayRole === "teacher"
                      ? "bg-lamaSkyLight text-blue-800"
                      : displayRole === "student"
                      ? "bg-lamaYellowLight text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {displayRole}
                </span>
              </div>
            </div>

            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-lamaPurple">
              <Image src={displayAvatar} alt={displayName} fill className="object-cover" sizes="36px" />
            </div>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 text-xs animate-in fade-in">
              <div className="p-3 border-b border-gray-100">
                <p className="font-bold text-gray-900">{displayName}</p>
                <p className="text-[11px] text-gray-500">
                  {currentUser?.email || `${currentUser?.username || "user"}@schoolama.com`}
                </p>
                <span className="inline-block mt-1.5 text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-bold uppercase">
                  {displayRole} Portal
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  My Profile &amp; Bio
                </Link>
                {displayRole === "admin" && (
                  <Link
                    href="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    System Settings
                  </Link>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-bold transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out from Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}