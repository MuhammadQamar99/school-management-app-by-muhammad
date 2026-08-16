"use client";

import React from "react";
import { Search } from "lucide-react";

interface TableSearchProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

export const TableSearch = ({
  value = "",
  onChange,
  placeholder = "Search...",
}: TableSearchProps) => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-3 py-1.5 bg-white focus-within:ring-lamaPurple transition-all">
      <Search className="w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-[180px] md:w-[200px] bg-transparent outline-none text-gray-700 placeholder-gray-400 text-xs"
      />
    </div>
  );
};
export default TableSearch;
