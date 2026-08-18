"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserRole,
  Teacher,
  Student,
  Parent,
  Subject,
  ClassItem,
  Lesson,
  Exam,
  Assignment,
  Result,
  EventItem,
  AnnouncementItem,
  AttendanceRecord,
  RoleRequest,
} from "@/types";
import {
  teachersData as initialTeachers,
  studentsData as initialStudents,
  parentsData as initialParents,
  subjectsData as initialSubjects,
  classesData as initialClasses,
  lessonsData as initialLessons,
  examsData as initialExams,
  assignmentsData as initialAssignments,
  resultsData as initialResults,
  eventsData as initialEvents,
  announcementsData as initialAnnouncements,
  initialAttendanceRecords,
} from "@/lib/data";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  time: string;
}

const initialRoleRequests: RoleRequest[] = [
  {
    id: "req-1",
    name: "Muhammad Qamar",
    email: "qamar.student@example.com",
    requestedRole: "student",
    classSection: "10A",
    status: "PENDING",
    createdAt: "2026-08-16 09:30",
  },
  {
    id: "req-2",
    name: "Ayesha Khan",
    email: "ayesha.khan@example.com",
    requestedRole: "teacher",
    subjects: "Chemistry, Biology",
    status: "PENDING",
    createdAt: "2026-08-16 08:45",
  },
  {
    id: "req-3",
    name: "Tariq Mahmood",
    email: "tariq.m@example.com",
    requestedRole: "parent",
    childName: "Lucas Bennett",
    status: "PENDING",
    createdAt: "2026-08-15 16:20",
  },
];

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  teachers: Teacher[];
  students: Student[];
  parents: Parent[];
  subjects: Subject[];
  classes: ClassItem[];
  lessons: Lesson[];
  exams: Exam[];
  assignments: Assignment[];
  results: Result[];
  events: EventItem[];
  announcements: AnnouncementItem[];
  attendanceRecords: AttendanceRecord[];
  roleRequests: RoleRequest[];
  notifications: Notification[];
  showRoleBanner: boolean;
  setShowRoleBanner: (show: boolean) => void;
  // CRUD actions
  addItem: (table: string, item: any) => void;
  updateItem: (table: string, id: number, item: any) => void;
  deleteItem: (table: string, id: number) => void;
  markAttendance: (studentId: number, status: "PRESENT" | "ABSENT" | "LATE", date?: string) => void;
  submitRoleRequest: (req: Omit<RoleRequest, "id" | "status" | "createdAt">) => void;
  approveRoleRequest: (id: string) => void;
  rejectRoleRequest: (id: string) => void;
  addToast: (title: string, message: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<UserRole>("admin");
  const [showRoleBanner, setShowRoleBanner] = useState<boolean>(true);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [results, setResults] = useState<Result[]>(initialResults);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [roleRequests, setRoleRequests] = useState<RoleRequest[]>(initialRoleRequests);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "System Initialized",
      message: "SchooLama Next.js School Management is ready to explore.",
      type: "info",
      time: "Just now",
    },
  ]);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("schoolama_role");
      if (savedRole && ["admin", "teacher", "student", "parent"].includes(savedRole)) {
        setRoleState(savedRole as UserRole);
      }
      const savedRequests = localStorage.getItem("schoolama_requests");
      if (savedRequests) setRoleRequests(JSON.parse(savedRequests));
    } catch {}
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem("schoolama_role", newRole);
    } catch {}
    addToast("Role Switched", `Now viewing interface as ${newRole.toUpperCase()}`, "info");
  };

  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "warning" | "error" = "success"
  ) => {
    const id = Date.now().toString();
    const newNotif: Notification = {
      id,
      title,
      message,
      type,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 9)]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const submitRoleRequest = (req: Omit<RoleRequest, "id" | "status" | "createdAt">) => {
    const newReq: RoleRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toLocaleString([], { dateStyle: "short", timeStyle: "short" }),
    };
    const updated = [newReq, ...roleRequests];
    setRoleRequests(updated);
    try {
      localStorage.setItem("schoolama_requests", JSON.stringify(updated));
    } catch {}
    addToast("Request Submitted", "Your role assignment request was sent to School Admin.", "info");
  };

  const approveRoleRequest = (id: string) => {
    const target = roleRequests.find((r) => r.id === id);
    if (!target) return;

    const updated = roleRequests.map((r) =>
      r.id === id ? { ...r, status: "APPROVED" as const } : r
    );
    setRoleRequests(updated);

    if (target.requestedRole === "student") {
      const newStudent: Student = {
        id: Date.now(),
        studentId: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
        name: target.name,
        email: target.email,
        phone: "+92 300 1234567",
        grade: target.classSection?.startsWith("9") ? 9 : 10,
        class: target.classSection || "10A",
        address: "Campus Residence, Block A",
        parent: "Guardian Assigned",
        photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      };
      setStudents((prev) => [newStudent, ...prev]);
    } else if (target.requestedRole === "teacher") {
      const newTeacher: Teacher = {
        id: Date.now(),
        teacherId: `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
        name: target.name,
        email: target.email,
        phone: "+92 300 7654321",
        subjects: target.subjects?.split(",").map((s) => s.trim()) || ["General Science"],
        classes: ["10A", "11B"],
        address: "Faculty Chambers #12",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      };
      setTeachers((prev) => [newTeacher, ...prev]);
    }

    try {
      localStorage.setItem("schoolama_requests", JSON.stringify(updated));
    } catch {}
    addToast("Role Approved! ✅", `${target.name} has been approved as ${target.requestedRole.toUpperCase()}.`, "success");
  };

  const rejectRoleRequest = (id: string) => {
    const updated = roleRequests.map((r) =>
      r.id === id ? { ...r, status: "REJECTED" as const } : r
    );
    setRoleRequests(updated);
    try {
      localStorage.setItem("schoolama_requests", JSON.stringify(updated));
    } catch {}
    addToast("Request Rejected ❌", "Role request has been declined.", "warning");
  };

  const addItem = (table: string, item: any) => {
    const id = Date.now();
    const newItem = { ...item, id };

    switch (table) {
      case "teacher":
        setTeachers((prev) => [newItem, ...prev]);
        break;
      case "student":
        setStudents((prev) => [newItem, ...prev]);
        break;
      case "parent":
        setParents((prev) => [newItem, ...prev]);
        break;
      case "subject":
        setSubjects((prev) => [newItem, ...prev]);
        break;
      case "class":
        setClasses((prev) => [newItem, ...prev]);
        break;
      case "lesson":
        setLessons((prev) => [newItem, ...prev]);
        break;
      case "exam":
        setExams((prev) => [newItem, ...prev]);
        break;
      case "assignment":
        setAssignments((prev) => [newItem, ...prev]);
        break;
      case "result":
        setResults((prev) => [newItem, ...prev]);
        break;
      case "event":
        setEvents((prev) => [newItem, ...prev]);
        break;
      case "announcement":
        setAnnouncements((prev) => [newItem, ...prev]);
        break;
      default:
        break;
    }
    addToast("Created Successfully", `New ${table} record was created!`, "success");
  };

  const updateItem = (table: string, id: number, item: any) => {
    const updateFn = (list: any[]) =>
      list.map((existing) => (existing.id === id ? { ...existing, ...item } : existing));

    switch (table) {
      case "teacher":
        setTeachers(updateFn);
        break;
      case "student":
        setStudents(updateFn);
        break;
      case "parent":
        setParents(updateFn);
        break;
      case "subject":
        setSubjects(updateFn);
        break;
      case "class":
        setClasses(updateFn);
        break;
      case "lesson":
        setLessons(updateFn);
        break;
      case "exam":
        setExams(updateFn);
        break;
      case "assignment":
        setAssignments(updateFn);
        break;
      case "result":
        setResults(updateFn);
        break;
      case "event":
        setEvents(updateFn);
        break;
      case "announcement":
        setAnnouncements(updateFn);
        break;
      default:
        break;
    }
    addToast("Updated Successfully", `${table.toUpperCase()} #${id} has been updated!`, "success");
  };

  const deleteItem = (table: string, id: number) => {
    const filterFn = (list: any[]) => list.filter((item) => item.id !== id);

    switch (table) {
      case "teacher":
        setTeachers(filterFn);
        break;
      case "student":
        setStudents(filterFn);
        break;
      case "parent":
        setParents(filterFn);
        break;
      case "subject":
        setSubjects(filterFn);
        break;
      case "class":
        setClasses(filterFn);
        break;
      case "lesson":
        setLessons(filterFn);
        break;
      case "exam":
        setExams(filterFn);
        break;
      case "assignment":
        setAssignments(filterFn);
        break;
      case "result":
        setResults(filterFn);
        break;
      case "event":
        setEvents(filterFn);
        break;
      case "announcement":
        setAnnouncements(filterFn);
        break;
      default:
        break;
    }
    addToast("Deleted", `${table.toUpperCase()} #${id} was deleted.`, "warning");
  };

  const markAttendance = (
    studentId: number,
    status: "PRESENT" | "ABSENT" | "LATE",
    date: string = "2026-08-16"
  ) => {
    setAttendanceRecords((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.date === date);
      const student = students.find((s) => s.id === studentId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], status };
        return next;
      } else {
        return [
          ...prev,
          {
            id: Date.now(),
            studentId,
            studentName: student?.name || `Student #${studentId}`,
            class: student?.class || "10A",
            date,
            status,
          },
        ];
      }
    });
    addToast("Attendance Marked", `Student status updated to ${status}.`, "info");
  };

  const resetAllData = () => {
    setTeachers(initialTeachers);
    setStudents(initialStudents);
    setParents(initialParents);
    setSubjects(initialSubjects);
    setClasses(initialClasses);
    setLessons(initialLessons);
    setExams(initialExams);
    setAssignments(initialAssignments);
    setResults(initialResults);
    setEvents(initialEvents);
    setAnnouncements(initialAnnouncements);
    setAttendanceRecords(initialAttendanceRecords);
    setRoleRequests(initialRoleRequests);
    localStorage.clear();
    addToast("Reset Completed", "All data has been reset to default state.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        teachers,
        students,
        parents,
        subjects,
        classes,
        lessons,
        exams,
        assignments,
        results,
        events,
        announcements,
        attendanceRecords,
        roleRequests,
        notifications,
        showRoleBanner,
        setShowRoleBanner,
        addItem,
        updateItem,
        deleteItem,
        markAttendance,
        submitRoleRequest,
        approveRoleRequest,
        rejectRoleRequest,
        addToast,
        removeToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};