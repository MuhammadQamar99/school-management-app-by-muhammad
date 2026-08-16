"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Megaphone } from "lucide-react";

export const Announcements = () => {
  const { announcements } = useApp();

  const colors = [
    { bg: "bg-lamaSkyLight", border: "border-sky-200", badgeBg: "bg-white text-sky-800" },
    { bg: "bg-lamaPurpleLight", border: "border-purple-200", badgeBg: "bg-white text-purple-800" },
    { bg: "bg-lamaYellowLight", border: "border-yellow-200", badgeBg: "bg-white text-amber-800" },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-500" />
          <h1 className="text-sm font-bold text-gray-800">Notice Board</h1>
        </div>
        <Link
          href="/list/announcements"
          className="text-xs text-purple-600 hover:underline font-semibold"
        >
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {announcements.slice(0, 3).map((item, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div
              key={item.id}
              className={`${color.bg} ${color.border} border rounded-xl p-3 shadow-2xs transition-all hover:translate-x-0.5`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold text-xs text-gray-800">{item.title}</h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs ${color.badgeBg}`}>
                  {item.date}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
                <span className="font-medium">Target: <strong className="text-gray-600">{item.class}</strong></span>
                <span className="text-purple-700 font-medium cursor-pointer hover:underline">Read details →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Announcements;
