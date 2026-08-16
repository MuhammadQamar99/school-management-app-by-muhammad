"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 8,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs border-t border-gray-100 mt-4">
      <div>
        Showing{" "}
        <span className="font-semibold text-gray-800">
          {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-800">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="font-semibold text-gray-800">{totalItems}</span> entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange && onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage <= 1}
          className="py-1.5 px-3 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange && onPageChange(p)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                currentPage === p
                  ? "bg-lamaSky text-blue-950 font-bold shadow-2xs"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange && onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="py-1.5 px-3 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition flex items-center gap-1"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
