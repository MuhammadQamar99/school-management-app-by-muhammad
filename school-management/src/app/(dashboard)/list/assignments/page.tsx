"use client";

import React, { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { Assignment } from "@/types";
import { ClipboardList, ArrowUpDown, Calendar } from "lucide-react";

const columns = [
  { header: "Assignment Subject", accessor: "subject" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Due Date", accessor: "dueDate", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function AssignmentListPage() {
  const { assignments, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAssignments = assignments.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.subject.toLowerCase().includes(q) ||
      a.class.toLowerCase().includes(q) ||
      a.teacher.toLowerCase().includes(q)
    );
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    return sortOrder === "asc"
      ? a.subject.localeCompare(b.subject)
      : b.subject.localeCompare(a.subject);
  });

  const totalPages = Math.max(1, Math.ceil(sortedAssignments.length / itemsPerPage));
  const displayedAssignments = sortedAssignments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Assignment) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaSkyLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-lamaSky flex items-center justify-center font-bold text-blue-950 text-xs shrink-0">
          <ClipboardList className="w-4 h-4" />
        </div>
        <span className="font-semibold text-gray-800 text-xs">{item.subject}</span>
      </td>
      <td className="hidden md:table-cell font-semibold text-gray-700">{item.class}</td>
      <td className="hidden md:table-cell text-gray-600">{item.teacher}</td>
      <td className="hidden lg:table-cell">
        <span className="text-[11px] text-gray-600 flex items-center gap-1 font-mono">
          <Calendar className="w-3 h-3 text-gray-400" />
          {item.dueDate}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="assignment" type="update" data={item} id={item.id} />
              {role === "admin" && <FormModal table="assignment" type="delete" id={item.id} />}
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
          <h1 className="text-base font-bold text-gray-800">All Homework & Assignments</h1>
          <p className="text-xs text-gray-400">Total assigned tasks: {assignments.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search assignments..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={displayedAssignments} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedAssignments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
