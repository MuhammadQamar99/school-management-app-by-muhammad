"use client";

import React from "react";
import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";
import FormModal from "@/components/FormModal";
import { BookOpen, Users, Clock, Award, CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";

export default function TeacherPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 flex-1">
      {/* LEFT (SCHEDULE & STATS) */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* BANNER */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
              Teacher Portal
            </span>
            <h1 className="text-xl font-bold mt-1">Welcome back, Sarah Jenkins!</h1>
            <p className="text-xs text-blue-100 mt-0.5">
              Science &amp; Physics Department • Homeroom Supervisor: <strong>Class 11A</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/list/attendance"
              className="bg-white text-indigo-900 px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-blue-50 transition shadow-xs"
            >
              Take Attendance
            </Link>
            <FormModal table="exam" type="create" />
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-lamaSky rounded-xl text-blue-900">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">Active Lessons</p>
              <h3 className="text-lg font-bold text-gray-800">14 / wk</h3>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-lamaYellow rounded-xl text-amber-900">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">Students</p>
              <h3 className="text-lg font-bold text-gray-800">108</h3>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-lamaPurple rounded-xl text-purple-900">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">Attendance</p>
              <h3 className="text-lg font-bold text-gray-800">96.4%</h3>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">Avg Class GPA</p>
              <h3 className="text-lg font-bold text-gray-800">3.72</h3>
            </div>
          </div>
        </div>

        {/* TIMETABLE */}
        <BigCalendar filterTeacher="Sarah Jenkins" />
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* TODAY'S LESSONS QUICK LIST */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              Today&apos;s Teaching Schedule
            </h2>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded">
              3 Classes
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded-xl bg-lamaSkyLight border border-sky-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-blue-950">Physics (Mechanics)</h4>
                <p className="text-[11px] text-blue-800">Class 10A • Science Lab B</p>
              </div>
              <span className="font-mono text-xs font-bold text-blue-900 bg-white px-2 py-1 rounded">
                10:00 AM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-lamaYellowLight border border-amber-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-amber-950">Chemistry (Organic)</h4>
                <p className="text-[11px] text-amber-800">Class 11A • Science Lab A</p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-900 bg-white px-2 py-1 rounded">
                01:30 PM
              </span>
            </div>
          </div>
        </div>

        <Announcements />
      </div>
    </div>
  );
}
