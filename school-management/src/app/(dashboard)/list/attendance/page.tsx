"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, XCircle, Clock, Calendar, Users, Filter, Check, Save } from "lucide-react";
import Image from "next/image";

export default function AttendancePage() {
  const { students, attendanceRecords, markAttendance, addToast, role } = useApp();
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("2026-08-16");

  const filteredStudents =
    selectedClass === "All"
      ? students
      : students.filter((s) => s.class === selectedClass);

  const getStudentStatus = (studentId: number) => {
    const record = attendanceRecords.find(
      (r) => r.studentId === studentId && r.date === selectedDate
    );
    return record ? record.status : "PRESENT";
  };

  const presentCount = filteredStudents.filter((s) => getStudentStatus(s.id) === "PRESENT").length;
  const lateCount = filteredStudents.filter((s) => getStudentStatus(s.id) === "LATE").length;
  const absentCount = filteredStudents.filter((s) => getStudentStatus(s.id) === "ABSENT").length;
  const attendanceRate = Math.round(
    ((presentCount + lateCount * 0.5) / (filteredStudents.length || 1)) * 100
  );

  const handleStatusChange = (studentId: number, status: "PRESENT" | "ABSENT" | "LATE") => {
    markAttendance(studentId, status, selectedDate);
  };

  const markAllPresent = () => {
    filteredStudents.forEach((s) => {
      markAttendance(s.id, "PRESENT", selectedDate);
    });
    addToast("Bulk Update", `Marked all ${filteredStudents.length} students PRESENT for ${selectedDate}`);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-600" />
            Class Attendance Register & Roll Call
          </h1>
          <p className="text-xs text-gray-400">
            Real-time presence tracking, leave management, and daily roll calls
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent outline-none text-xs font-semibold text-gray-700"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent outline-none text-xs font-semibold text-gray-700"
            >
              <option value="All">All Classes</option>
              <option value="10A">Class 10A</option>
              <option value="10B">Class 10B</option>
              <option value="9A">Class 9A</option>
              <option value="9B">Class 9B</option>
              <option value="11A">Class 11A</option>
              <option value="11B">Class 11B</option>
              <option value="12A">Class 12A</option>
            </select>
          </div>

          {(role === "admin" || role === "teacher") && (
            <button
              onClick={markAllPresent}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Mark All Present
            </button>
          )}
        </div>
      </div>

      {/* STAT SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-lamaSkyLight p-3.5 rounded-xl border border-sky-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-blue-900 font-semibold">Present</p>
            <h3 className="text-xl font-bold text-blue-950">{presentCount}</h3>
          </div>
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
        </div>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-amber-900 font-semibold">Late Arrivals</p>
            <h3 className="text-xl font-bold text-amber-950">{lateCount}</h3>
          </div>
          <Clock className="w-6 h-6 text-amber-600" />
        </div>

        <div className="bg-red-50 p-3.5 rounded-xl border border-red-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-red-900 font-semibold">Absent</p>
            <h3 className="text-xl font-bold text-red-950">{absentCount}</h3>
          </div>
          <XCircle className="w-6 h-6 text-red-600" />
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-emerald-900 font-semibold">Attendance Rate</p>
            <h3 className="text-xl font-bold text-emerald-950">{attendanceRate}%</h3>
          </div>
          <Users className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* STUDENT ROSTER ROLL CALL */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase text-[11px]">
              <th className="py-3 px-3">Student Name</th>
              <th className="py-3 px-3">Student ID</th>
              <th className="py-3 px-3">Class</th>
              <th className="py-3 px-3 text-center">Status Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.map((student) => {
              const status = getStudentStatus(student.id);

              return (
                <tr key={student.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="font-semibold text-gray-800">{student.name}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-600">{student.studentId}</td>
                  <td className="py-3 px-3 font-semibold text-gray-700">{student.class}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStatusChange(student.id, "PRESENT")}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] transition flex items-center gap-1 ${
                          status === "PRESENT"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-800"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Present
                      </button>

                      <button
                        onClick={() => handleStatusChange(student.id, "LATE")}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] transition flex items-center gap-1 ${
                          status === "LATE"
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Late
                      </button>

                      <button
                        onClick={() => handleStatusChange(student.id, "ABSENT")}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] transition flex items-center gap-1 ${
                          status === "ABSENT"
                            ? "bg-red-600 text-white shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-800"
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
