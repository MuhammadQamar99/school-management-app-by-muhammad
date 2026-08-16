"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface GenericFormProps {
  table: string;
  type: "create" | "update";
  data?: any;
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

export const GenericForm = ({ table, type, data, onSubmit, onClose }: GenericFormProps) => {
  const [formData, setFormData] = useState<any>(() => {
    switch (table) {
      case "parent":
        return {
          name: data?.name || "",
          email: data?.email || "",
          phone: data?.phone || "",
          address: data?.address || "",
          students: data?.students?.join(", ") || "Lucas Bennett",
        };
      case "subject":
        return {
          name: data?.name || "",
          code: data?.code || "SUB-101",
          teachers: data?.teachers?.join(", ") || "Alexander Dean",
        };
      case "class":
        return {
          name: data?.name || "",
          capacity: data?.capacity || 28,
          grade: data?.grade || 10,
          supervisor: data?.supervisor || "Alexander Dean",
        };
      case "lesson":
        return {
          subject: data?.subject || "Mathematics",
          class: data?.class || "10A",
          teacher: data?.teacher || "Alexander Dean",
          day: data?.day || "Monday",
          startTime: data?.startTime || "09:00",
          endTime: data?.endTime || "10:15",
        };
      case "exam":
        return {
          subject: data?.subject || "Physics Final Examination",
          class: data?.class || "10A",
          teacher: data?.teacher || "Sarah Jenkins",
          date: data?.date || "2026-09-15",
          startTime: data?.startTime || "09:00",
          endTime: data?.endTime || "11:00",
        };
      case "assignment":
        return {
          subject: data?.subject || "Chemistry Organic Chemistry Lab Report",
          class: data?.class || "10A",
          teacher: data?.teacher || "Sarah Jenkins",
          dueDate: data?.dueDate || "2026-08-30",
        };
      case "result":
        return {
          subject: data?.subject || "Mathematics",
          class: data?.class || "10A",
          student: data?.student || "Lucas Bennett",
          teacher: data?.teacher || "Alexander Dean",
          score: data?.score || 92,
          type: data?.type || "exam",
          date: data?.date || "2026-08-16",
        };
      case "event":
        return {
          title: data?.title || "",
          class: data?.class || "All Classes",
          date: data?.date || "2026-08-25",
          startTime: data?.startTime || "10:00",
          endTime: data?.endTime || "12:00",
          description: data?.description || "",
        };
      case "announcement":
        return {
          title: data?.title || "",
          class: data?.class || "All Classes",
          date: data?.date || "2026-08-16",
          description: data?.description || "",
        };
      default:
        return {};
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData };
    if (finalData.students && typeof finalData.students === "string") {
      finalData.students = finalData.students.split(",").map((s: string) => s.trim());
    }
    if (finalData.teachers && typeof finalData.teachers === "string") {
      finalData.teachers = finalData.teachers.split(",").map((t: string) => t.trim());
    }
    if (finalData.capacity) finalData.capacity = Number(finalData.capacity);
    if (finalData.grade) finalData.grade = Number(finalData.grade);
    if (finalData.score) finalData.score = Number(finalData.score);

    onSubmit(finalData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-base font-bold text-gray-800 capitalize">
          {type === "create" ? `Create New ${table}` : `Update ${table}`}
        </h1>
        <span className="text-[11px] text-gray-400 capitalize">{table} Management</span>
      </div>

      {table === "parent" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Guardian Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Children (comma separated)</label>
              <input
                type="text"
                name="students"
                value={formData.students}
                onChange={handleChange}
                placeholder="Lucas Bennett, Sophia Martinez"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Home Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      )}

      {table === "subject" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Subject Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Course Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Assigned Teachers (comma separated)</label>
            <input
              type="text"
              name="teachers"
              value={formData.teachers}
              onChange={handleChange}
              placeholder="Alexander Dean, Marcus Vance"
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      )}

      {table === "class" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Class Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="10A"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Grade Level</label>
              <input
                type="number"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Supervisor Teacher</label>
            <input
              type="text"
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
              required
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      )}

      {table === "lesson" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Class</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Teacher</label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Day</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {table === "exam" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Exam Title / Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Class Section</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Teacher</label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {table === "assignment" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Assignment Title</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Class Section</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Teacher</label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {table === "result" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Student Name</label>
              <input
                type="text"
                name="student"
                value={formData.student}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Score (0-100)</label>
              <input
                type="number"
                name="score"
                min="0"
                max="100"
                value={formData.score}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              >
                <option value="exam">Exam</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Class Section</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {(table === "event" || table === "announcement") && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Target Audience / Class</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                placeholder="All Classes or 10A"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
              />
            </div>
            {table === "event" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 font-medium">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 font-medium">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Detailed Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 mt-4 pt-3 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition shadow-xs flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          {type === "create" ? "Create Record" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
