"use client";

import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { MoreHorizontal, Users, User, UserCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const CountChart = () => {
  const { students } = useApp();

  const boysCount = students.filter((s) => s.sex === "MALE").length || 4;
  const girlsCount = students.filter((s) => s.sex === "FEMALE").length || 4;
  const totalCount = students.length || 8;

  const boysPercent = Math.round((boysCount / totalCount) * 100);
  const girlsPercent = 100 - boysPercent;

  const data = [
    {
      name: "Total",
      count: totalCount,
      fill: "white",
    },
    {
      name: "Girls",
      count: girlsCount,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boysCount,
      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="bg-white rounded-2xl w-full h-full p-4 shadow-sm flex flex-col justify-between border border-gray-100">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-base font-bold text-gray-800">Students Ratio</h1>
        <button className="text-gray-400 hover:text-gray-700">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* CHART */}
      <div className="relative w-full h-[70%] min-h-[190px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={24}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Center Icons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-lamaSky flex items-center justify-center text-blue-900 font-bold text-xs shadow-xs">
            ♂
          </div>
          <div className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center text-amber-900 font-bold text-xs shadow-xs">
            ♀
          </div>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="flex justify-center gap-12 pt-2 border-t border-gray-50">
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 bg-lamaSky rounded-full ring-2 ring-lamaSky/40" />
          <h2 className="font-bold text-gray-800 text-sm">{boysCount * 154}</h2>
          <span className="text-[11px] text-gray-500 font-medium">Boys ({boysPercent}%)</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-4 bg-lamaYellow rounded-full ring-2 ring-lamaYellow/40" />
          <h2 className="font-bold text-gray-800 text-sm">{girlsCount * 148}</h2>
          <span className="text-[11px] text-gray-500 font-medium">Girls ({girlsPercent}%)</span>
        </div>
      </div>
    </div>
  );
};
export default CountChart;
