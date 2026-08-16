"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Settings,
  Database,
  ShieldCheck,
  Server,
  RefreshCw,
  Code2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function SettingsPage() {
  const { role, resetAllData, showRoleBanner, setShowRoleBanner, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<"settings" | "schema" | "clerk" | "actions">("settings");

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            System Settings &amp; Full-Stack Architecture Guide
          </h1>
          <p className="text-xs text-gray-400">
            Configure application state, view Prisma DB models, and inspect full-stack code recipes
          </p>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "settings" ? "bg-white text-purple-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "schema" ? "bg-white text-purple-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Prisma Schema
          </button>
          <button
            onClick={() => setActiveTab("clerk")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "clerk" ? "bg-white text-purple-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Clerk Auth
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "actions" ? "bg-white text-purple-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Server Actions
          </button>
        </div>
      </div>

      {activeTab === "settings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DEMO DATA CONTROL */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-xs">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 border-b pb-2">
              <Database className="w-4 h-4 text-blue-600" />
              Demo Data &amp; State Storage
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This interactive dashboard stores your created, edited, and deleted records in local reactive state. You can reset back to initial sample state anytime.
            </p>
            <div className="pt-2">
              <button
                onClick={resetAllData}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-xl border border-red-200 transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Sample Dataset to Default
              </button>
            </div>
          </div>

          {/* PREVIEW CONTROLS */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-xs">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 border-b pb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Interactive Role Bar
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Toggle the top role switcher bar visible or minimized.
            </p>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-semibold text-gray-700">Show Top Role Switcher</span>
              <button
                onClick={() => {
                  setShowRoleBanner(!showRoleBanner);
                  addToast("Role Switcher", showRoleBanner ? "Bar minimized" : "Bar shown");
                }}
                className={`px-3 py-1 rounded-full font-bold text-[11px] transition ${
                  showRoleBanner ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {showRoleBanner ? "Active (Shown)" : "Hidden"}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "schema" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              Prisma Schema (`prisma/schema.prisma`)
            </h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
              PostgreSQL
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Here is the full database schema matching Lama Dev&apos;s tutorial with relational models for Admin, Teacher, Student, Parent, Grade, Class, Subject, Lesson, Exam, Assignment, Result, Attendance, Event, Announcement:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-[450px]">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserSex {
  MALE
  FEMALE
}

enum Day {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
}

model Admin {
  id       String @id
  username String @unique
}

model Student {
  id          String       @id
  username    String       @unique
  name        String
  surname     String
  email       String?      @unique
  phone       String?      @unique
  address     String
  img         String?
  bloodType   String
  sex         UserSex
  createdAt   DateTime     @default(now())
  parentId    String
  parent      Parent       @relation(fields: [parentId], references: [id])
  classId     Int
  class       Class        @relation(fields: [classId], references: [id])
  gradeId     Int
  grade       Grade        @relation(fields: [gradeId], references: [id])
  attendances Attendance[]
  results     Result[]
  birthday    DateTime
}

model Teacher {
  id        String    @id
  username  String    @unique
  name      String
  surname   String
  email     String?   @unique
  phone     String?   @unique
  address   String
  img       String?
  bloodType String
  sex       UserSex
  createdAt DateTime  @default(now())
  subjects  Subject[]
  lessons   Lesson[]
  classes   Class[]
  birthday  DateTime
}

model Parent {
  id        String    @id
  username  String    @unique
  name      String
  surname   String
  email     String?   @unique
  phone     String    @unique
  address   String
  createdAt DateTime  @default(now())
  students  Student[]
}

model Grade {
  id       Int       @id @default(autoincrement())
  level    Int       @unique
  students Student[]
  classes  Class[]
}

model Class {
  id            Int            @id @default(autoincrement())
  name          String         @unique
  capacity      Int
  supervisorId  String?
  supervisor    Teacher?       @relation(fields: [supervisorId], references: [id])
  lessons       Lesson[]
  students      Student[]
  gradeId       Int
  grade         Grade          @relation(fields: [gradeId], references: [id])
  events        Event[]
  announcements Announcement[]
}

model Subject {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  teachers Teacher[]
  lessons  Lesson[]
}

model Lesson {
  id          Int          @id @default(autoincrement())
  name        String
  day         Day
  startTime   DateTime
  endTime     DateTime
  subjectId   Int
  subject     Subject      @relation(fields: [subjectId], references: [id])
  classId     Int
  class       Class        @relation(fields: [classId], references: [id])
  teacherId   String
  teacher     Teacher      @relation(fields: [teacherId], references: [id])
  exams       Exam[]
  assignments Assignment[]
  attendances Attendance[]
}

model Exam {
  id        Int      @id @default(autoincrement())
  title     String
  startTime DateTime
  endTime   DateTime
  lessonId  Int
  lesson    Lesson   @relation(fields: [lessonId], references: [id])
  results   Result[]
}

model Assignment {
  id        Int      @id @default(autoincrement())
  title     String
  startDate DateTime
  dueDate   DateTime
  lessonId  Int
  lesson    Lesson   @relation(fields: [lessonId], references: [id])
  results   Result[]
}

model Result {
  id           Int         @id @default(autoincrement())
  score        Int
  examId       Int?
  exam         Exam?       @relation(fields: [examId], references: [id])
  assignmentId Int?
  assignment   Assignment? @relation(fields: [assignmentId], references: [id])
  studentId    String
  student      Student     @relation(fields: [studentId], references: [id])
}

model Attendance {
  id        Int      @id @default(autoincrement())
  date      DateTime
  present   Boolean
  studentId String
  student   Student  @relation(fields: [studentId], references: [id])
  lessonId  Int
  lesson    Lesson   @relation(fields: [lessonId], references: [id])
}

model Event {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  startTime   DateTime
  endTime     DateTime
  classId     Int?
  class       Class?   @relation(fields: [classId], references: [id])
}

model Announcement {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  date        DateTime
  classId     Int?
  class       Class?   @relation(fields: [classId], references: [id])
}`}
          </pre>
        </div>
      )}

      {activeTab === "clerk" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Clerk Multi-Role Authentication Setup
            </h3>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono">
              @clerk/nextjs
            </span>
          </div>

          <div className="flex flex-col gap-3 text-gray-700">
            <p>
              In Lama Dev&apos;s tutorial, user roles (<code>admin</code>, <code>teacher</code>, <code>student</code>, <code>parent</code>) are stored in Clerk&apos;s <code>publicMetadata</code>.
            </p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px]">
{`// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL("/" + role, req.url));
    }
  }
});`}
            </div>
          </div>
        </div>
      )}

      {activeTab === "actions" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" />
              Server Actions with Zod Validation
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
              Next.js Server Actions
            </span>
          </div>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
{`// src/lib/actions.ts
"use server";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { teacherSchema, studentSchema } from "./formValidationSchemas";

export const createTeacher = async (currentState: any, data: any) => {
  try {
    const validatedData = teacherSchema.parse(data);
    const user = await clerkClient.users.createUser({
      username: validatedData.username,
      password: validatedData.password,
      firstName: validatedData.name,
      lastName: validatedData.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: validatedData.username,
        name: validatedData.name,
        surname: validatedData.surname,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        bloodType: validatedData.bloodType,
        sex: validatedData.sex,
        birthday: validatedData.birthday,
        subjects: {
          connect: validatedData.subjects?.map((id: number) => ({ id })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    return { success: false, error: true };
  }
};`}
          </pre>
        </div>
      )}
    </div>
  );
}
