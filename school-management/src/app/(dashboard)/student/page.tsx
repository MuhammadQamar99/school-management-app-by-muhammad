"use client";

import React from "react";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import PerformanceChart from "@/components/PerformanceChart";
import { GraduationCap, Award, BookOpen, CheckCircle2, Clock, Calendar } from "lucide-react";

export default function StudentPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 flex-1">
      {/* LEFT (SCHEDULE & STATS) */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* BANNER */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                Student Profile • Grade 10
              </span>
              <h1 className="text-xl font-bold mt-0.5">Lucas Bennett</h1>
              <p className="text-xs text-purple-100">Section 10A • Student ID: STD-2024-001</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
            <Award className="w-5 h-5 text-lamaYellow" />
            <div className="text-right">
              <p className="text-[10px] text-purple-200">Current GPA</p>
              <p className="text-sm font-extrabold text-white">3.92 / 4.0</p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Class Attendance</p>
            <h3 className="text-lg font-bold text-gray-800 mt-1">98.5%</h3>
            <span className="text-[10px] text-emerald-600 font-semibold">Perfect Record</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Courses Enrolled</p>
            <h3 className="text-lg font-bold text-gray-800 mt-1">6 Subjects</h3>
            <span className="text-[10px] text-purple-600 font-semibold">Term 1 (2026)</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Upcoming Exams</p>
            <h3 className="text-lg font-bold text-gray-800 mt-1">2 Tests</h3>
            <span className="text-[10px] text-amber-600 font-semibold">Math & Physics</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Completed Tasks</p>
            <h3 className="text-lg font-bold text-gray-800 mt-1">19 / 20</h3>
            <span className="text-[10px] text-blue-600 font-semibold">95% Submitted</span>
          </div>
        </div>

        {/* TIMETABLE */}
        <BigCalendar filterClass="10A" />
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <PerformanceChart score={9.4} maxScore={10} title="Lucas's Grade Index" />
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
