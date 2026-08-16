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
  notifications: Notification[];
  showRoleBanner: boolean;
  setShowRoleBanner: (show: boolean) => void;
  // CRUD actions
  addItem: (table: string, item: any) => void;
  updateItem: (table: string, id: number, item: any) => void;
  deleteItem: (table: string, id: number) => void;
  markAttendance: (studentId: number, status: "PRESENT" | "ABSENT" | "LATE", date?: string) => void;
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
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "System Initialized",
      message: "SchooLama Next.js School Management is ready to explore.",
      type: "info",
      time: "Just now",
    },
  ]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("schoolama_role");
      if (savedRole && ["admin", "teacher", "student", "parent"].includes(savedRole)) {
        setRoleState(savedRole as UserRole);
      }
      const savedTeachers = localStorage.getItem("schoolama_teachers");
      if (savedTeachers) setTeachers(JSON.parse(savedTeachers));
      const savedStudents = localStorage.getItem("schoolama_students");
      if (savedStudents) setStudents(JSON.parse(savedStudents));
      const savedClasses = localStorage.getItem("schoolama_classes");
      if (savedClasses) setClasses(JSON.parse(savedClasses));
    } catch {
      // LocalStorage fallback
    }
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
        notifications,
        showRoleBanner,
        setShowRoleBanner,
        addItem,
        updateItem,
        deleteItem,
        markAttendance,
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
