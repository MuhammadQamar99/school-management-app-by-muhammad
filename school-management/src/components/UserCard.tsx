import React from "react";
import { MoreHorizontal, TrendingUp } from "lucide-react";

interface UserCardProps {
  type: string;
  count: string | number;
  bg?: string;
  date?: string;
  increase?: string;
}

export const UserCard = ({
  type,
  count,
  bg = "odd:bg-lamaPurple even:bg-lamaYellow",
  date = "2026/27",
  increase = "+12% vs last term",
}: UserCardProps) => {
  return (
    <div
      className={`rounded-2xl p-4 flex-1 min-w-[130px] shadow-sm transition-transform hover:-translate-y-0.5 ${bg}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-700 font-semibold shadow-xs flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {date}
        </span>
        <button className="text-gray-500 hover:text-gray-900 p-0.5 rounded-full hover:bg-white/40 transition">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <h1 className="text-2xl font-bold my-3 text-gray-800 tracking-tight">{count}</h1>
      <div className="flex items-center justify-between">
        <h2 className="capitalize text-xs font-semibold text-gray-600 tracking-wide">
          {type}s
        </h2>
        <span className="text-[10px] text-gray-500 hidden sm:inline font-medium">
          {increase}
        </span>
      </div>
    </div>
  );
};
export default UserCard;
