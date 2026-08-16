"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import { weeklyAttendanceData } from "@/lib/data";

export const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 h-full shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-base font-bold text-gray-800">Weekly Attendance</h1>
          <p className="text-[11px] text-gray-400">Student presence vs absence rate</p>
        </div>
        <button className="text-gray-400 hover:text-gray-700">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full h-[85%] min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyAttendanceData} barSize={16} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              domain={[0, 100]}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                borderColor: "#e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value}%`, ""]}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "0px", paddingBottom: "15px", fontSize: "12px" }}
            />
            <Bar
              dataKey="present"
              name="Present"
              fill="#FAE27C"
              legendType="circle"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="absent"
              name="Absent"
              fill="#C3EBFA"
              legendType="circle"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default AttendanceChart;
