export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface Teacher {
  id: number;
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
  bloodType?: string;
  birthday?: string;
  sex?: "MALE" | "FEMALE" | "OTHER";
  bio?: string;
}

export interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  grade: number;
  class: string;
  address: string;
  parent: string;
  sex?: "MALE" | "FEMALE" | "OTHER";
  bloodType?: string;
  birthday?: string;
}

export interface Parent {
  id: number;
  name: string;
  students: string[];
  email: string;
  phone: string;
  address: string;
}

export interface Subject {
  id: number;
  name: string;
  teachers: string[];
  code?: string;
  lessonsCount?: number;
}

export interface ClassItem {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
}

export interface Lesson {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  day?: string;
  startTime?: string;
  endTime?: string;
}

export interface Exam {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
  startTime?: string;
  endTime?: string;
}

export interface Assignment {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
}

export interface Result {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: string;
  type: "exam" | "assignment";
  score: number;
}

export interface EventItem {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  class: string;
  date: string;
  description: string;
}

export interface TimetableEvent {
  id: number;
  title: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "09:30"
  teacher: string;
  class: string;
  room: string;
  colorBg: string;
  colorBorder: string;
}

export interface AttendanceRecord {
  id: number;
  studentId: number;
  studentName: string;
  class: string;
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE";
}
