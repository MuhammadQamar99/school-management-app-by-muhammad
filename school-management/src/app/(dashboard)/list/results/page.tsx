"use client";

import React, { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { Result } from "@/types";
import { Award, ArrowUpDown, Calendar } from "lucide-react";

const columns = [
  { header: "Subject", accessor: "subject" },
  { header: "Student", accessor: "student" },
  { header: "Score", accessor: "score" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function ResultListPage() {
  const { results, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredResults = results.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.subject.toLowerCase().includes(q) ||
      r.student.toLowerCase().includes(q) ||
      r.class.toLowerCase().includes(q) ||
      r.teacher.toLowerCase().includes(q)
    );
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
  });

  const totalPages = Math.max(1, Math.ceil(sortedResults.length / itemsPerPage));
  const displayedResults = sortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaPurpleLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-lamaPurple flex items-center justify-center font-bold text-purple-950 text-xs shrink-0">
          <Award className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-gray-800 text-xs">{item.subject}</span>
          <span className="block text-[10px] text-gray-400 uppercase tracking-wider">{item.type}</span>
        </div>
      </td>
      <td className="font-semibold text-gray-800">{item.student}</td>
      <td>
        <span
          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
            item.score >= 90
              ? "bg-emerald-100 text-emerald-800"
              : item.score >= 75
              ? "bg-blue-100 text-blue-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {item.score} / 100
        </span>
      </td>
      <td className="hidden md:table-cell text-gray-600">{item.teacher}</td>
      <td className="hidden md:table-cell text-gray-700 font-semibold">{item.class}</td>
      <td className="hidden lg:table-cell">
        <span className="text-[11px] text-gray-500 flex items-center gap-1 font-mono">
          <Calendar className="w-3 h-3 text-gray-400" />
          {item.date}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="result" type="update" data={item} id={item.id} />
              {role === "admin" && <FormModal table="result" type="delete" id={item.id} />}
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-between">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-gray-800">All Exam & Assignment Results</h1>
          <p className="text-xs text-gray-400">Total recorded grade entries: {results.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search student, subject or class..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort by Score"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {(role === "admin" || role === "teacher") && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={displayedResults} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedResults.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
