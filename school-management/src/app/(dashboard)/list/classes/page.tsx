"use client";

import React, { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { ClassItem } from "@/types";
import { School, ArrowUpDown } from "lucide-react";

const columns = [
  { header: "Class Name", accessor: "name" },
  { header: "Capacity", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Supervisor", accessor: "supervisor", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function ClassListPage() {
  const { classes, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredClasses = classes.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.supervisor.toLowerCase().includes(q) ||
      c.grade.toString().includes(q)
    );
  });

  const sortedClasses = [...filteredClasses].sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const totalPages = Math.max(1, Math.ceil(sortedClasses.length / itemsPerPage));
  const displayedClasses = sortedClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: ClassItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaYellowLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-lamaYellow flex items-center justify-center font-bold text-amber-950 text-xs shrink-0">
          <School className="w-4 h-4" />
        </div>
        <span className="font-semibold text-gray-800 text-xs">{item.name}</span>
      </td>
      <td className="hidden md:table-cell font-mono text-[11px] text-gray-600">
        {item.capacity} students max
      </td>
      <td className="hidden md:table-cell">
        <span className="bg-lamaPurpleLight text-purple-900 border border-purple-200 text-[10px] px-2 py-0.5 rounded font-medium">
          Grade {item.grade}
        </span>
      </td>
      <td className="hidden md:table-cell text-gray-700 font-medium">{item.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} id={item.id} />
              <FormModal table="class" type="delete" id={item.id} />
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
          <h1 className="text-base font-bold text-gray-800">All Classes & Sections</h1>
          <p className="text-xs text-gray-400">Total registered classrooms: {classes.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search class or supervisor..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {role === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={displayedClasses} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedClasses.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
