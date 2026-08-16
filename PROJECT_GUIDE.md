# Complete Step-by-Step Guide: Building SchooLama Full-Stack Dashboard

This guide walks through every step taught in **Lama Dev's Next.js Full-Stack School Management App Tutorial** (`https://youtu.be/6sfiAyKy8Jo`).

---

## 📑 Table of Contents
1. [Project Initialization & Tailwind Setup](#1-project-initialization--tailwind-setup)
2. [Color Palette & Theme Configuration](#2-color-palette--theme-configuration)
3. [Component Architecture](#3-component-architecture)
4. [Prisma Database Schema & PostgreSQL Relations](#4-prisma-database-schema--postgresql-relations)
5. [Clerk Authentication & Multi-Role Middleware](#5-clerk-authentication--multi-role-middleware)
6. [Zod Validation Schemas & Server Actions](#6-zod-validation-schemas--server-actions)
7. [Running and Testing the Application](#7-running-and-testing-the-application)

---

## 1. Project Initialization & Tailwind Setup

```bash
npx create-next-app@14.2.5 school-management --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd school-management
npm install lucide-react recharts react-calendar clsx tailwind-merge
```

---

## 2. Color Palette & Theme Configuration

In `tailwind.config.ts`, add the custom SchooLama color scheme:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lamaSky: "#C3EBFA",
        lamaSkyLight: "#EDF9FD",
        lamaPurple: "#CFCEFF",
        lamaPurpleLight: "#F1F0FF",
        lamaYellow: "#FAE27C",
        lamaYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 3. Component Architecture

The application is structured cleanly around role-specific dashboard views and shared management tables:

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx             # Sidebar Menu + Navbar + Dynamic RoleSwitcher
│   │   ├── admin/page.tsx         # UserCards + CountChart + AttendanceChart + FinanceChart + Calendar
│   │   ├── teacher/page.tsx       # Teacher Timetable + Today's Schedule + Announcements
│   │   ├── student/page.tsx       # Student Schedule + Performance Gauge + Exams/Assignments
│   │   ├── parent/page.tsx        # Child Progress + Timetable + Teacher Contact
│   │   ├── list/
│   │   │   ├── teachers/          # Faculty Table & Single Teacher Profile (/list/teachers/[id])
│   │   │   ├── students/          # Student Table & Single Student Profile (/list/students/[id])
│   │   │   ├── parents/           # Guardians Table
│   │   │   ├── subjects/          # Courses & Instructors
│   │   │   ├── classes/           # Sections & Supervisors
│   │   │   ├── lessons/           # Lesson Timetable Roster
│   │   │   ├── exams/             # Assessment Scheduler
│   │   │   ├── assignments/       # Homework Due Dates
│   │   │   ├── results/           # Grading Breakdown
│   │   │   ├── attendance/        # Live Attendance Register & Roll Call
│   │   │   ├── events/            # Campus Calendar
│   │   │   ├── announcements/     # School Bulletins
│   │   │   └── messages/          # Direct Messaging Chat
│   │   ├── profile/page.tsx       # User Credentials & Bio
│   │   └── settings/page.tsx      # System Configuration & Prisma Guide
├── components/
│   ├── Navbar.tsx
│   ├── Menu.tsx
│   ├── UserCard.tsx
│   ├── CountChart.tsx
│   ├── AttendanceChart.tsx
│   ├── FinanceChart.tsx
│   ├── PerformanceChart.tsx
│   ├── EventCalendar.tsx
│   ├── Announcements.tsx
│   ├── BigCalendar.tsx
│   ├── Table.tsx
│   ├── TableSearch.tsx
│   ├── Pagination.tsx
│   ├── FormModal.tsx
│   └── forms/ (TeacherForm, StudentForm, GenericForms)
├── context/
│   └── AppContext.tsx             # Reactive state management with local persistence
└── types/
    └── index.ts
```

---

## 4. Prisma Database Schema & PostgreSQL Relations

The database schema (`prisma/schema.prisma`) represents 14 connected entities:

- **Admin**: System management.
- **Student**: Tied to a `Class`, `Grade`, and `Parent`. Holds `Attendance` and `Result` records.
- **Teacher**: Teaches multiple `Subject`s, `Lesson`s, and `Class`es.
- **Parent**: Has many `Student`s.
- **Grade**: Contains `Student`s and `Class`es.
- **Class**: Supervised by a `Teacher`, contains `Lesson`s, `Event`s, and `Announcement`s.
- **Subject**: Belongs to `Teacher`s and `Lesson`s.
- **Lesson**: Bridges `Subject`, `Class`, and `Teacher` on specific `Day` and time intervals.
- **Exam** & **Assignment**: Created for a `Lesson` with graded `Result`s.
- **Attendance**: Daily tracking for each student per lesson.
- **Event** & **Announcement**: School-wide or class-specific communications.

---

## 5. Clerk Authentication & Multi-Role Middleware

In Clerk, assign custom role claims to users using `publicMetadata`:
```json
{
  "role": "admin" // or "teacher" | "student" | "parent"
}
```

Then protect routes in `middleware.ts`:
```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const routeAccessMap: Record<string, string[]> = {
  "/admin(.*)": ["admin"],
  "/teacher(.*)": ["teacher", "admin"],
  "/student(.*)": ["student", "admin"],
  "/parent(.*)": ["parent", "admin"],
  "/list/teachers(.*)": ["admin", "teacher"],
  "/list/students(.*)": ["admin", "teacher"],
  "/list/parents(.*)": ["admin", "teacher"],
  "/list/subjects(.*)": ["admin"],
  "/list/classes(.*)": ["admin", "teacher"],
};

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL("/" + (role || "sign-in"), req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

---

## 6. Zod Validation Schemas & Server Actions

Validate all incoming data on the server with Zod before modifying the database:

```ts
// src/lib/formValidationSchemas.ts
import { z } from "zod";

export const teacherSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  surname: z.string().min(1),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string(),
  birthday: z.coerce.date(),
  sex: z.enum(["MALE", "FEMALE"]),
  subjects: z.array(z.string()).optional(),
});
```

---

## 7. Running and Testing the Application

1. Start the live Next.js server:
   ```bash
   npm run dev -- -p 3000 -H 0.0.0.0
   ```
2. Interact with the live preview in your browser:
   - Use the **Interactive Role Switcher** top bar to toggle between **Admin**, **Teacher**, **Student**, and **Parent** dashboards.
   - Test the **CRUD Modal Forms** (Add new teachers, students, exams, etc.).
   - Mark student attendance on the **Attendance Register** page (`/list/attendance`).
   - Filter, search, and sort across all 10+ data tables.
