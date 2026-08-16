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
} from "lucide-react";

export default function SingleTeacherPage() {
  const params = useParams();
  const { teachers, role } = useApp();

  const teacherId = Number(params?.id) || 1;
  const teacher = teachers.find((t) => t.id === teacherId) || teachers[0];

  if (!teacher) {
    return (
      <div className="bg-white p-8 rounded-2xl text-center">
        <p className="text-sm text-gray-500">Teacher record not found.</p>
        <Link href="/list/teachers" className="text-xs text-purple-600 font-bold mt-2 inline-block">
          ← Back to Teachers List
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* BACK BUTTON */}
      <div className="flex items-center justify-between">
        <Link
          href="/list/teachers"
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Teachers
        </Link>
        {role === "admin" && (
          <FormModal table="teacher" type="update" data={teacher} id={teacher.id} />
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
                <Image src={teacher.photo} alt={teacher.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-gray-800">{teacher.name}</h1>
                </div>
                <p className="text-[11px] text-gray-600 line-clamp-2">
                  {teacher.bio || "Dedicated educator specializing in student-centric interactive pedagogy."}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-[10px] text-gray-700 font-medium pt-1 border-t border-blue-200/60">
                  <span className="flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-red-500" />
                    {teacher.bloodType || "A+"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    {teacher.birthday || "1988-06-12"}
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[120px]">
                    <Mail className="w-3 h-3 text-gray-600" />
                    {teacher.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-600" />
                    {teacher.phone}
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
                  <h3 className="text-base font-bold text-gray-800">92%</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Attendance</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-lamaPurpleLight text-purple-800 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{teacher.subjects?.length || 2}</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Branches</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-lamaYellowLight text-amber-800 rounded-xl">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">6</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Lessons / Wk</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl flex gap-3 w-full sm:w-[48%] shadow-sm border border-gray-100 items-center">
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">{teacher.classes?.length || 4}</h3>
                  <span className="text-[11px] text-gray-400 font-medium">Classes</span>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <BigCalendar filterTeacher={teacher.name} />
        </div>

        {/* RIGHT (1/3 width) */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          {/* SHORTCUTS CARD */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Quick Shortcuts</h2>
            <div className="flex gap-2 flex-wrap text-xs">
              <Link
                href="/list/classes"
                className="p-2.5 rounded-xl bg-lamaSkyLight text-blue-900 border border-sky-200 font-medium hover:bg-sky-200 transition flex items-center gap-1.5"
              >
                <School className="w-3.5 h-3.5" />
                Teacher&apos;s Classes
              </Link>
              <Link
                href="/list/students"
                className="p-2.5 rounded-xl bg-lamaPurpleLight text-purple-900 border border-purple-200 font-medium hover:bg-purple-200 transition flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Teacher&apos;s Students
              </Link>
              <Link
                href="/list/lessons"
                className="p-2.5 rounded-xl bg-lamaYellowLight text-amber-900 border border-amber-200 font-medium hover:bg-amber-200 transition flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                Teacher&apos;s Lessons
              </Link>
              <Link
                href="/list/exams"
                className="p-2.5 rounded-xl bg-pink-50 text-pink-900 border border-pink-200 font-medium hover:bg-pink-100 transition flex items-center gap-1.5"
              >
                <FileCheck className="w-3.5 h-3.5" />
                Teacher&apos;s Exams
              </Link>
              <Link
                href="/list/assignments"
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium hover:bg-emerald-100 transition flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                Assignments
              </Link>
            </div>
          </div>

          {/* PERFORMANCE GAUGE */}
          <PerformanceChart score={9.1} maxScore={10} title="Teacher Rating" semester="Student Feedback Score" />

          {/* ANNOUNCEMENTS */}
          <Announcements />
        </div>
      </div>
    </div>
  );
}
