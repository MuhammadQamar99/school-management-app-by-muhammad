"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowUpDown, Plus } from "lucide-react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { Student } from "@/types";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Student ID", accessor: "studentId", className: "hidden md:table-cell" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Parent", accessor: "parent", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden xl:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function StudentListPage() {
  const { students, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q) ||
      s.parent.toLowerCase().includes(q)
    );
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const totalPages = Math.max(1, Math.ceil(sortedStudents.length / itemsPerPage));
  const displayedStudents = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaSkyLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
          <Image src={item.photo} alt={item.name} fill className="object-cover" sizes="36px" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 text-xs">{item.name}</h3>
          <p className="text-[11px] text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell font-mono text-[11px] text-gray-600">
        {item.studentId}
      </td>
      <td className="hidden md:table-cell">
        <span className="bg-lamaYellowLight text-amber-900 border border-yellow-200 text-[10px] px-2 py-0.5 rounded font-semibold">
          Grade {item.grade}
        </span>
      </td>
      <td className="hidden md:table-cell font-semibold text-gray-700">{item.class}</td>
      <td className="hidden lg:table-cell text-gray-600">{item.parent}</td>
      <td className="hidden xl:table-cell text-gray-500 max-w-[160px] truncate">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/list/students/${item.id}`}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky hover:bg-sky-300 text-blue-950 transition"
            title="View Single Student Page"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
          {role === "admin" && (
            <>
              <FormModal table="student" type="update" data={item} id={item.id} />
              <FormModal table="student" type="delete" id={item.id} />
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
          <h1 className="text-base font-bold text-gray-800">All Students</h1>
          <p className="text-xs text-gray-400">Total enrolled pupils: {students.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search students, class or guardian..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort Alphabetically"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <Table columns={columns} renderRow={renderRow} data={displayedStudents} />

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedStudents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
