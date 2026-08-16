"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import BigCalendar from "@/components/BigCalendar";
import PerformanceChart from "@/components/PerformanceChart";
import Announcements from "@/components/Announcements";
import FormModal from "@/components/FormModal";
import {
  Mail,
  Phone,
  Calendar,
  Droplet,
  BookOpen,
  School,
  CheckCircle2,
  Layers,
  ArrowLeft,
  GraduationCap,
  Award,
  FileCheck,
  User,
} from "lucide-react";

export default function SingleStudentPage() {
  const params = useParams();
  const { students, role } = useApp();

  const studentId = Number(params?.id) || 1;
  const student = students.find((s) => s.id === studentId) || students[0];

  if (!student) {
    return (
      <div className="bg-white p-8 rounded-2xl text-center">
        <p className="text-sm text-gray-500">Student record not found.</p>
        <Link href="/list/students" className="text-xs text-purple-600 font-bold mt-2 inline-block">
          ← Back to Students List
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* BACK BUTTON */}
      <div className="flex items-center justify-between">
        <Link
          href="/list/students"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>
        {role === "admin" && (
          <FormModal table="student" type="update" data={student} id={student.id} />
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-4">
        {/* LEFT (2/3 width) */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4">
          {/* TOP INFO & STAT CARDS */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO CARD */}
            <div className="bg-lamaSky py-5 px-4 rounded-2xl flex-1 flex gap-4 shadow-sm">
              <div className="w-24 h-24 relative rounded-full overflow-hidden shrink-0 ring-4 ring-white/80">
                <Image src={student.photo} alt={student.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-gray-800">{student.name}</h1>
                </div>
                <p className="text-[11px] text-gray-600">
                  Enrolled in {student.class} • Parent: <strong>{student.parent}</strong>
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-[10px] text-gray-700 font-medium pt-1 border-t border-blue-200/60">
                  <span className="flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-red-500" />
                    {student.bloodType || "A+"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    {student.birthday || "2008-04-14"}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[120px]">
                    <Mail className="w-3 h-3 text-gray-600" />
                    {student.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-600" />
                    {student.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 MINI STAT CARDS */}
            <div className="flex-1 flex gap-3 justify-between flex-wrap">
              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-lamaSkyLight text-blue-800 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">95%</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Attendance</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-lamaPurpleLight text-purple-800 rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{student.grade}th</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Grade Level</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-lamaYellowLight text-amber-800 rounded-xl">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">18</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Lessons / Wk</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{student.class}</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Class Section</span>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <BigCalendar filterClass={student.class} />
        </div>

        {/* RIGHT (1/3 width) */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          {/* SHORTCUTS CARD */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Student Shortcuts</h2>
            <div className="flex gap-2 flex-wrap text-xs">
              <Link
                href="/list/results"
                className="p-2.5 rounded-xl bg-lamaSkyLight text-blue-900 border border-sky-200 font-medium hover:bg-sky-200 transition flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                Student&apos;s Results
              </Link>
              <Link
                href="/list/teachers"
                className="p-2.5 rounded-xl bg-lamaPurpleLight text-purple-900 border border-purple-200 font-medium hover:bg-purple-200 transition flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                Student&apos;s Teachers
              </Link>
              <Link
                href="/list/lessons"
                className="p-2.5 rounded-xl bg-lamaYellowLight text-amber-900 border border-amber-200 font-medium hover:bg-amber-200 transition flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                Student&apos;s Lessons
              </Link>
              <Link
                href="/list/exams"
                className="p-2.5 rounded-xl bg-pink-50 text-pink-900 border border-pink-200 font-medium hover:bg-pink-100 transition flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5" />
                Student&apos;s Exams
              </Link>
              <Link
                href="/list/assignments"
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium hover:bg-emerald-100 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Assignments
              </Link>
            </div>
          </div>

          {/* PERFORMANCE GAUGE */}
          <PerformanceChart score={9.4} maxScore={10} title="Student Score Index" semester="Current Term Average" />

          {/* ANNOUNCEMENTS */}
          <Announcements />
        </div>
      </div>
    </div>
  );
}
