"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Filter, ArrowUpDown, Plus } from "lucide-react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { Teacher } from "@/types";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden xl:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function TeacherListPage() {
  const { teachers, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTeachers = teachers.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.teacherId.toLowerCase().includes(q) ||
      t.subjects?.some((s) => s.toLowerCase().includes(q))
    );
  });

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const totalPages = Math.max(1, Math.ceil(sortedTeachers.length / itemsPerPage));
  const displayedTeachers = sortedTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaPurpleLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
          <Image src={item.photo} alt={item.name} fill className="object-cover" sizes="36px" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 text-xs">{item.name}</h3>
          <p className="text-[11px] text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell font-mono text-[11px] text-gray-600">
        {item.teacherId}
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {item.subjects?.map((s) => (
            <span
              key={s}
              className="bg-lamaSkyLight text-blue-900 border border-sky-200 text-[10px] px-1.5 py-0.5 rounded font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {item.classes?.map((c) => (
            <span
              key={c}
              className="bg-lamaPurpleLight text-purple-900 border border-purple-200 text-[10px] px-1.5 py-0.5 rounded font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </td>
      <td className="hidden lg:table-cell text-gray-600">{item.phone}</td>
      <td className="hidden xl:table-cell text-gray-500 max-w-[160px] truncate">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/list/teachers/${item.id}`}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky hover:bg-sky-300 text-blue-950 transition"
            title="View Single Teacher Page"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
          {role === "admin" && (
            <>
              <FormModal table="teacher" type="update" data={item} id={item.id} />
              <FormModal table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-between">
      {/* TOP */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-gray-800">All Teachers</h1>
          <p className="text-xs text-gray-400">Total faculty members: {teachers.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search teachers or subjects..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <Table columns={columns} renderRow={renderRow} data={displayedTeachers} />

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedTeachers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
