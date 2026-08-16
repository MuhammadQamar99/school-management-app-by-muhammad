"use client";

import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { MoreHorizontal, Award } from "lucide-react";

interface PerformanceChartProps {
  score?: number;
  maxScore?: number;
  title?: string;
  semester?: string;
}

export const PerformanceChart = ({
  score = 9.2,
  maxScore = 10,
  title = "Academic Performance",
  semester = "1st Term - 2nd Term Average",
}: PerformanceChartProps) => {
  const percentage = (score / maxScore) * 100;
  const remaining = 100 - percentage;

  const data = [
    { name: "Score", value: percentage, fill: "#C3EBFA" },
    { name: "Remaining", value: remaining, fill: "#FAE27C" },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-600" />
          <h1 className="text-base font-bold text-gray-800">{title}</h1>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      <div className="relative w-full h-44 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="70%"
              innerRadius={70}
              outerRadius={95}
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{score.toFixed(1)}</h1>
          <p className="text-[10px] text-gray-400 font-medium">of {maxScore} max LTS</p>
        </div>
      </div>

      <div className="text-center mt-[-15px]">
        <h2 className="font-semibold text-xs text-gray-700">{semester}</h2>
        <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Top 8% percentile in class</p>
      </div>
    </div>
  );
};
export default PerformanceChart;
