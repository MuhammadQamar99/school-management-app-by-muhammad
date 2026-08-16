"use client";

import React, { useState } from "react";
import { Teacher } from "@/types";
import { Upload, Check, X } from "lucide-react";

interface TeacherFormProps {
  type: "create" | "update";
  data?: Teacher;
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

export const TeacherForm = ({ type, data, onSubmit, onClose }: TeacherFormProps) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    bloodType: data?.bloodType || "A+",
    birthday: data?.birthday || "1990-01-01",
    sex: data?.sex || "MALE",
    teacherId: data?.teacherId || `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
    subjects: data?.subjects?.join(", ") || "Mathematics, Physics",
    classes: data?.classes?.join(", ") || "10A, 11B",
    bio: data?.bio || "",
    photo:
      data?.photo ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      subjects: typeof formData.subjects === "string" ? formData.subjects.split(",").map((s) => s.trim()) : formData.subjects,
      classes: typeof formData.classes === "string" ? formData.classes.split(",").map((c) => c.trim()) : formData.classes,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-base font-bold text-gray-800">
          {type === "create" ? "Create a New Teacher" : `Update Teacher (${data?.name})`}
        </h1>
        <span className="text-[11px] text-gray-400">Step 1 of 1 • Faculty Profile</span>
      </div>

      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
        Authentication & Contact Info
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Teacher ID</label>
          <input
            type="text"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Dr. Jane Smith"
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
            placeholder="jane@schoolama.com"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 234 567 8900"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Campus Blvd, City"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Blood Group</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-2">
        Academic Assignments & Demographics
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Subjects (comma separated)</label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="Math, Physics"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Assigned Classes</label>
          <input
            type="text"
            name="classes"
            value={formData.classes}
            onChange={handleChange}
            placeholder="10A, 11B, 12A"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Photo URL / Avatar</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="https://..."
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-600 font-medium">Short Biography</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={2}
          placeholder="Brief summary of teaching philosophy and credentials..."
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
        />
      </div>

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
          {type === "create" ? "Create Teacher" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
export default TeacherForm;
