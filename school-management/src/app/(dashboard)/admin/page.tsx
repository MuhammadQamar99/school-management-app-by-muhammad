"use client";

import React from "react";
import UserCard from "@/components/UserCard";
import CountChart from "@/components/CountChart";
import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import { useApp } from "@/context/AppContext";

export default function AdminPage() {
  const { students, teachers, parents, classes } = useApp();

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      {/* LEFT COLUMN - 2/3 width */}
      <div className="w-full xl:w-2/3 flex flex-col gap-5">
        {/* USER CARDS */}
        <div className="flex gap-3 justify-between flex-wrap">
          <UserCard
            type="student"
            count={students.length * 154 || "1,234"}
            bg="bg-lamaPurple"
            date="2026/27"
            increase="+14% this year"
          />
          <UserCard
            type="teacher"
            count={teachers.length * 15 || "124"}
            bg="bg-lamaYellow"
            date="2026/27"
            increase="+6% new faculty"
          />
          <UserCard
            type="parent"
            count={parents.length * 148 || "890"}
            bg="bg-lamaSky"
            date="2026/27"
            increase="98% portal active"
          />
          <UserCard
            type="class"
            count={classes.length || "34"}
            bg="bg-lamaPurpleLight border border-purple-200"
            date="2026/27"
            increase="7 sections"
          />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART (BOYS VS GIRLS) */}
          <div className="w-full lg:w-1/3 h-[420px]">
            <CountChart />
          </div>
          {/* ATTENDANCE BAR CHART */}
          <div className="w-full lg:w-2/3 h-[420px]">
            <AttendanceChart />
          </div>
        </div>

        {/* BOTTOM FINANCE LINE CHART */}
        <div className="w-full h-[450px]">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT COLUMN - 1/3 width */}
      <div className="w-full xl:w-1/3 flex flex-col gap-5">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
