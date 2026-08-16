"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import { monthlyFinanceData } from "@/lib/data";

export const FinanceChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 h-full shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-base font-bold text-gray-800">Finance Overview</h1>
          <p className="text-[11px] text-gray-400">Total Income vs Operational Expenses</p>
        </div>
        <button className="text-gray-400 hover:text-gray-700">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full h-[85%] min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyFinanceData}
            margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                borderColor: "#e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "0px", paddingBottom: "15px", fontSize: "12px" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={{ r: 3, fill: "#3b82f6" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#c084fc"
              strokeWidth={3}
              dot={{ r: 3, fill: "#a855f7" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default FinanceChart;
