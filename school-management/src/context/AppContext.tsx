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

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  time: string;
}

export interface RoleRequest {
  id: string;
  name: string;
  email: string;
  requestedRole: Exclude<UserRole, "admin">;
  classSection?: string;
  subjects?: string;
  childName?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

type NewRoleRequest = Omit<RoleRequest, "id" | "status" | "createdAt">;

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
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
  roleRequests: RoleRequest[];
  submitRoleRequest: (request: NewRoleRequest) => void;
  approveRoleRequest: (id: string) => void;
  rejectRoleRequest: (id: string) => void;
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
  id: 1,
  name: "Safak K. (Principal)",
  username: "admin",
  role: "admin",
  email: "admin@schoolama.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

const defaultUsers: Record<string, { pass: string; user: AuthUser }> = {
  admin: {
    pass: "admin123",
    user: defaultAdminUser,
  },
  "sarah.j": {
    pass: "teacher123",
    user: {
      id: 2,
      name: "Sarah Jenkins",
      username: "sarah.j",
      role: "teacher",
      email: "sarah.j@lamaedu.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      classSection: "10A, 11A",
    },
  },
  teacher: {
    pass: "teacher123",
    user: {
      id: 2,
      name: "Sarah Jenkins",
      username: "teacher",
      role: "teacher",
      email: "sarah.j@lamaedu.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      classSection: "10A, 11A",
    },
  },
  "lucas.b": {
    pass: "student123",
    user: {
      id: 1,
      name: "Lucas Bennett",
      username: "lucas.b",
      role: "student",
      email: "lucas.b@lamaedu.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      classSection: "10A",
    },
  },
  student: {
    pass: "student123",
    user: {
      id: 1,
      name: "Lucas Bennett",
      username: "student",
      role: "student",
      email: "lucas.b@lamaedu.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      classSection: "10A",
    },
  },
  "thomas.b": {
    pass: "parent123",
    user: {
      id: 1,
      name: "Thomas Bennett",
      username: "thomas.b",
      role: "parent",
      email: "t.bennett@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  },
  parent: {
    pass: "parent123",
    user: {
      id: 1,
      name: "Thomas Bennett",
      username: "parent",
      role: "parent",
      email: "t.bennett@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(defaultAdminUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [role, setRoleState] = useState<UserRole>("admin");
  const [showRoleBanner, setShowRoleBanner] = useState<boolean>(true);
  const [roleRequests, setRoleRequests] = useState<RoleRequest[]>([]);

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

      const savedRequests = localStorage.getItem("schoolama_role_requests");
      if (savedRequests) {
        const parsedRequests: unknown = JSON.parse(savedRequests);
        if (Array.isArray(parsedRequests)) {
          setRoleRequests(parsedRequests as RoleRequest[]);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("schoolama_role_requests", JSON.stringify(roleRequests));
    } catch {}
  }, [roleRequests]);

  const login = (username: string, pass: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const match = defaultUsers[cleanUser];

    if (match && match.pass === pass) {
      setCurrentUser(match.user);
      setIsAuthenticated(true);
      setRoleState(match.user.role);

      try {
        localStorage.setItem(
          "schoolama_auth",
          JSON.stringify({ isAuth: true, user: match.user })
        );
        localStorage.setItem("schoolama_role", match.user.role);
      } catch {}

      addToast("Login Successful! 🎉", `Welcome back, ${match.user.name}`, "success");
      return true;
    }

    return false;
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

  const submitRoleRequest = (request: NewRoleRequest) => {
    const newRequest: RoleRequest = {
      ...request,
      id: crypto.randomUUID(),
      status: "PENDING",
      createdAt: new Date().toLocaleString(),
    };
    setRoleRequests((previous) => [newRequest, ...previous]);
    addToast("Request Submitted", "Your registration is awaiting administrator approval.", "success");
  };

  const updateRoleRequestStatus = (id: string, status: RoleRequest["status"]) => {
    setRoleRequests((previous) =>
      previous.map((request) => (request.id === id ? { ...request, status } : request))
    );
  };

  const approveRoleRequest = (id: string) => {
    updateRoleRequestStatus(id, "APPROVED");
    addToast("Request Approved", "The applicant has been granted portal access.", "success");
  };

  const rejectRoleRequest = (id: string) => {
    updateRoleRequestStatus(id, "REJECTED");
    addToast("Request Declined", "The applicant registration was declined.", "warning");
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
    setRoleRequests([]);
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
        roleRequests,
        submitRoleRequest,
        approveRoleRequest,
        rejectRoleRequest,
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