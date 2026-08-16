# SchooLama - Next.js Full-Stack School Management System

> Built in reference to **Lama Dev's Next.js Full-Stack School Management App Tutorial** (`https://youtu.be/6sfiAyKy8Jo`).

An enterprise-ready, multi-role School Management System built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Recharts**, **Prisma ORM**, and **Clerk Authentication**.

---

## 🌟 Key Features

### 1. Multi-Role Interactive Portals
- 👑 **Admin Portal (`/admin`)**:
  - Stat cards for Students, Teachers, Parents, and Class Sections.
  - **CountChart**: Radial/Donut breakdown for Boys vs. Girls student ratio.
  - **AttendanceChart**: Mon-Fri weekly present vs. absent comparison.
  - **FinanceChart**: 12-month Income vs. Operating Expense area/line metrics.
  - Mini Calendar + Upcoming Events & Announcements.
- 🧑‍🏫 **Teacher Portal (`/teacher`)**:
  - Personalized weekly class schedule & period timetable.
  - Daily teaching roster and fast attendance shortcuts.
- 🎓 **Student Portal (`/student`)**:
  - Course enrollment overview, upcoming exams, homework tracker, and GPA score gauge.
  - Interactive weekly class timetable.
- 👪 **Parent Portal (`/parent`)**:
  - Child performance review, attendance percentage, class schedule, and supervisor direct messaging.

### 2. Comprehensive Resource Management Lists (with Full CRUD)
- 👩‍🏫 **Teachers (`/list/teachers`)**: Faculty roster, subjects, assigned classes, single teacher detail page (`/list/teachers/[id]`).
- 🎒 **Students (`/list/students`)**: Student roster, grade levels, parent linkage, single student detail page (`/list/students/[id]`).
- 👨‍👩‍👧 **Parents (`/list/parents`)**: Guardian contact records and associated students.
- 📚 **Subjects (`/list/subjects`)**: Course catalog with instructor assignments.
- 🏫 **Classes (`/list/classes`)**: Classrooms, capacity limits, and teacher supervisors.
- 📖 **Lessons (`/list/lessons`)**: Timetable lesson periods with time slots.
- 📝 **Exams (`/list/exams`)**: Assessment scheduler with exam dates.
- 📋 **Assignments (`/list/assignments`)**: Homework tracker with due dates.
- 🏆 **Results (`/list/results`)**: Exam and assignment grading index.
- 📅 **Attendance Register (`/list/attendance`)**: Live daily roll call with Present, Late, and Absent toggles!
- 🎪 **Events (`/list/events`)**: Campus event calendar with start/end times.
- 📢 **Announcements (`/list/announcements`)**: Notice board bulletins with color badges.
- 💬 **Messages (`/list/messages`)**: Real-time communication between teachers, parents, and admins.

### 3. Interactive Modals & Forms (`FormModal`)
- Dynamic Create, Update, and Delete modal dialogs.
- Validation, form fields for avatars, bios, blood types, birthdays, relations, and real-time state updates with toast feedback.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd school-management
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Database (PostgreSQL / Supabase / Neon)
DATABASE_URL="postgresql://username:password@localhost:5432/school_db?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Cloudinary (Optional image hosting)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
```

### 3. Prisma Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Run seed script
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom SchooLama palette: `lamaSky`, `lamaPurple`, `lamaYellow`)
- **Icons**: Lucide React
- **Charts**: Recharts (RadialBarChart, BarChart, LineChart, PieChart)
- **Calendar**: React-Calendar + Custom Responsive Big Calendar Timetable
- **ORM & DB**: Prisma ORM with PostgreSQL
- **Auth**: Clerk with Custom Role-Based Access Control (`admin`, `teacher`, `student`, `parent`)
