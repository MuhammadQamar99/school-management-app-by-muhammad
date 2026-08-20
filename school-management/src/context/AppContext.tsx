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

export interface AuthUser {
  id: string | number;
  name: string;
  username: string;
  role: UserRole;
  email: string;
  avatar: string;
  classSection?: string;
}

export interface UserAccount extends AuthUser {
  password: string;
  createdAt: string;
}

type NewUserAccount = Pick<UserAccount, "name" | "email" | "username" | "password" | "role" | "classSection">;

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
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => AuthUser | null;
  logout: () => void;
  accounts: UserAccount[];
  createAccount: (account: NewUserAccount) => { success: boolean; message?: string };
  deleteAccount: (id: string | number) => void;
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

const defaultAdminUser: AuthUser = {
  id: "admin-1",
  name: "Safak K. (Principal)",
  username: "admin",
  role: "admin",
  email: "admin@schoolama.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

const initialAccounts: UserAccount[] = [
  { ...defaultAdminUser, password: "admin123", createdAt: "System account" },
  {
    id: "teacher-1", name: "Sarah Jenkins", username: "teacher", role: "teacher", email: "sarah.j@lamaedu.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    classSection: "10A, 11A", password: "teacher123", createdAt: "System account",
  },
  {
    id: "student-1", name: "Lucas Bennett", username: "student", role: "student", email: "lucas.b@lamaedu.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    classSection: "10A", password: "student123", createdAt: "System account",
  },
  {
    id: "parent-1", name: "Thomas Bennett", username: "parent", role: "parent", email: "t.bennett@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    password: "parent123", createdAt: "System account",
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(defaultAdminUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [role, setRoleState] = useState<UserRole>("admin");
  const [showRoleBanner, setShowRoleBanner] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<UserAccount[]>(initialAccounts);

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
      message: "SchooLama School Management System active.",
      type: "info",
      time: "Just now",
    },
  ]);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("schoolama_auth");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        setCurrentUser(parsed.user);
        setIsAuthenticated(parsed.isAuth);
        setRoleState(parsed.user.role);
      }

      const savedAccounts = localStorage.getItem("schoolama_accounts");
      if (savedAccounts) {
        const parsedAccounts: unknown = JSON.parse(savedAccounts);
        if (Array.isArray(parsedAccounts)) setAccounts(parsedAccounts as UserAccount[]);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("schoolama_accounts", JSON.stringify(accounts));
    } catch {}
  }, [accounts]);

  const login = (username: string, pass: string): AuthUser | null => {
    const cleanUsername = username.trim().toLowerCase();
    const account = accounts.find(
      (item) => item.username.toLowerCase() === cleanUsername && item.password === pass
    );

    if (!account) return null;

    const { password: _password, createdAt: _createdAt, ...user } = account;
    setCurrentUser(user);
    setIsAuthenticated(true);
    setRoleState(user.role);

    try {
      localStorage.setItem("schoolama_auth", JSON.stringify({ isAuth: true, user }));
      localStorage.setItem("schoolama_role", user.role);
    } catch {}

    addToast("Login Successful! 🎉", `Welcome back, ${user.name}`, "success");
    return user;
  };

  const createAccount = (account: NewUserAccount) => {
    const username = account.username.trim().toLowerCase();
    if (accounts.some((item) => item.username.toLowerCase() === username)) {
      return { success: false, message: "This username is already in use." };
    }

    const newAccount: UserAccount = {
      ...account,
      id: crypto.randomUUID(),
      username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=7c3aed&color=fff`,
      createdAt: new Date().toLocaleString(),
    };
    setAccounts((previous) => [newAccount, ...previous]);
    addToast("Account Created", `${newAccount.name} can now sign in with the assigned credentials.`, "success");
    return { success: true };
  };

  const deleteAccount = (id: string | number) => {
    if (id === defaultAdminUser.id) {
      addToast("Action blocked", "The primary administrator account cannot be removed.", "warning");
      return;
    }
    setAccounts((previous) => previous.filter((account) => account.id !== id));
    addToast("Account Removed", "The user can no longer sign in on this browser.", "warning");
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("schoolama_auth");
    } catch {}
    addToast("Logged Out", "You have been signed out of the portal.", "info");
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem("schoolama_role", newRole);
    } catch {}
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
    setAccounts(initialAccounts);
    localStorage.clear();
    addToast("Reset Completed", "All data has been reset to default state.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        isAuthenticated,
        login,
        logout,
        accounts,
        createAccount,
        deleteAccount,
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