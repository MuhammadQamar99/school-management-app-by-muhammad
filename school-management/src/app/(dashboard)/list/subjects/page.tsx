"use client";

import React, { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { Subject } from "@/types";
import { BookOpen, ArrowUpDown } from "lucide-react";

const columns = [
  { header: "Subject Name", accessor: "name" },
  { header: "Code", accessor: "code", className: "hidden md:table-cell" },
  { header: "Teachers", accessor: "teachers", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function SubjectListPage() {
  const { subjects, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredSubjects = subjects.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.code?.toLowerCase().includes(q) ||
      s.teachers?.some((t) => t.toLowerCase().includes(q))
    );
  });

  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const totalPages = Math.max(1, Math.ceil(sortedSubjects.length / itemsPerPage));
  const displayedSubjects = sortedSubjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaSkyLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-lamaSky flex items-center justify-center font-bold text-blue-950 text-xs shrink-0">
          <BookOpen className="w-4 h-4" />
        </div>
        <span className="font-semibold text-gray-800 text-xs">{item.name}</span>
      </td>
      <td className="hidden md:table-cell font-mono text-[11px] text-gray-600">
        {item.code || `SUB-${item.id}`}
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {item.teachers?.map((t) => (
            <span
              key={t}
              className="bg-lamaPurpleLight text-purple-900 border border-purple-200 text-[10px] px-1.5 py-0.5 rounded font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} id={item.id} />
              <FormModal table="subject" type="delete" id={item.id} />
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
          <h1 className="text-base font-bold text-gray-800">All Subjects</h1>
          <p className="text-xs text-gray-400">Total active courses: {subjects.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search subjects or instructors..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={displayedSubjects} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedSubjects.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
