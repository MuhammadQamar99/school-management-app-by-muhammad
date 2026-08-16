"use client";

import React, { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { Parent } from "@/types";
import { ArrowUpDown } from "lucide-react";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Student Names", accessor: "students", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden xl:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function ParentListPage() {
  const { parents, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredParents = parents.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.students?.some((s) => s.toLowerCase().includes(q))
    );
  });

  const sortedParents = [...filteredParents].sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const totalPages = Math.max(1, Math.ceil(sortedParents.length / itemsPerPage));
  const displayedParents = sortedParents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Parent) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaPurpleLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-full bg-lamaPurple flex items-center justify-center font-bold text-purple-950 text-xs shrink-0">
          {item.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 text-xs">{item.name}</h3>
          <p className="text-[11px] text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {item.students?.map((s) => (
            <span
              key={s}
              className="bg-lamaSkyLight text-blue-900 border border-sky-200 text-[10px] px-1.5 py-0.5 rounded font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      </td>
      <td className="hidden lg:table-cell text-gray-600">{item.phone}</td>
      <td className="hidden xl:table-cell text-gray-500 max-w-[160px] truncate">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} id={item.id} />
              <FormModal table="parent" type="delete" id={item.id} />
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
          <h1 className="text-base font-bold text-gray-800">All Parents & Guardians</h1>
          <p className="text-xs text-gray-400">Total registered parents: {parents.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search guardian or child..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {role === "admin" && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={displayedParents} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedParents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
