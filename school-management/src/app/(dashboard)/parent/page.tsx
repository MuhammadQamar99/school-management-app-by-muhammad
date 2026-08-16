"use client";

import React from "react";
import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";
import PerformanceChart from "@/components/PerformanceChart";
import { Users, GraduationCap, Award, Phone, Mail, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ParentPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 flex-1">
      {/* LEFT (SCHEDULE & CHILD PROGRESS) */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* BANNER */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
              Parent Guardian Portal
            </span>
            <h1 className="text-xl font-bold mt-1">Thomas Bennett</h1>
            <p className="text-xs text-emerald-100 mt-0.5">
              Monitoring Student: <strong className="text-white">Lucas Bennett</strong> (Class 10A)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/list/messages"
              className="bg-white text-emerald-950 px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-emerald-50 transition shadow-xs flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Message Teacher
            </Link>
          </div>
        </div>

        {/* CHILD STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Child Attendance</p>
            <h3 className="text-lg font-bold text-gray-800 mt-1">98.5%</h3>
            <span className="text-[10px] text-emerald-600 font-semibold">1 Absent Day</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Term GPA</p>
            <h3 className="text-lg font-bold text-gray-800 mt-1">3.92</h3>
            <span className="text-[10px] text-purple-600 font-semibold">Rank #2 in Class</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Tuition Status</p>
            <h3 className="text-lg font-bold text-emerald-600 mt-1">Paid in Full</h3>
            <span className="text-[10px] text-gray-500 font-medium">Fall 2026</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
            <p className="text-[11px] text-gray-400 font-medium">Supervisor</p>
            <h3 className="text-xs font-bold text-gray-800 mt-1">Alexander Dean</h3>
            <span className="text-[10px] text-blue-600 font-medium">Room 102</span>
          </div>
        </div>

        {/* CHILD TIMETABLE */}
        <BigCalendar filterClass="10A" />
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <PerformanceChart score={9.4} maxScore={10} title="Lucas's Grade Average" />

        {/* TEACHER CONTACT CARD */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
          <h2 className="text-sm font-bold text-gray-800">Class Supervisor Contact</h2>
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-lamaPurple flex items-center justify-center font-bold text-purple-950">
              AD
            </div>
            <div>
              <h4 className="font-bold text-xs text-gray-800">Alexander Dean</h4>
              <p className="text-[11px] text-gray-500">Mathematics & Class 10A Lead</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>alexander.dean@lamaedu.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>+1 234 567 8901</span>
            </div>
          </div>
        </div>

        <Announcements />
      </div>
    </div>
  );
}
