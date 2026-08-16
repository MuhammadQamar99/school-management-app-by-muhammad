"use client";

import React, { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useApp } from "@/context/AppContext";
import { EventItem } from "@/types";
import { CalendarDays, ArrowUpDown, Clock } from "lucide-react";

const columns = [
  { header: "Event Title", accessor: "title" },
  { header: "Target Audience", accessor: "class", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Start Time", accessor: "startTime", className: "hidden lg:table-cell" },
  { header: "End Time", accessor: "endTime", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function EventListPage() {
  const { events, role } = useApp();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredEvents = events.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.class.toLowerCase().includes(q) ||
      e.description?.toLowerCase().includes(q)
    );
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return sortOrder === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
  });

  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / itemsPerPage));
  const displayedEvents = sortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (item: EventItem) => (
    <tr
      key={item.id}
      className="border-b border-gray-100 text-xs hover:bg-lamaSkyLight/40 transition-colors"
    >
      <td className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-xl bg-lamaSky flex items-center justify-center font-bold text-blue-950 text-xs shrink-0">
          <CalendarDays className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-gray-800 text-xs">{item.title}</span>
          {item.description && (
            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
          )}
        </div>
      </td>
      <td className="hidden md:table-cell">
        <span className="bg-lamaYellowLight text-amber-900 border border-yellow-200 text-[10px] px-2 py-0.5 rounded font-medium">
          {item.class}
        </span>
      </td>
      <td className="hidden md:table-cell font-mono text-[11px] text-gray-600">{item.date}</td>
      <td className="hidden lg:table-cell font-mono text-[11px] text-gray-600">{item.startTime}</td>
      <td className="hidden lg:table-cell font-mono text-[11px] text-gray-600">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} id={item.id} />
              <FormModal table="event" type="delete" id={item.id} />
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
          <h1 className="text-base font-bold text-gray-800">All Campus Events</h1>
          <p className="text-xs text-gray-400">Total planned activities: {events.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search events..."
          />
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-yellow-400 text-amber-950 transition shadow-2xs"
              title="Sort by Date"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={displayedEvents} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedEvents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
