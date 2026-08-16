"use client";

import React, { useState } from "react";
import { Student } from "@/types";
import { Check, X } from "lucide-react";

interface StudentFormProps {
  type: "create" | "update";
  data?: Student;
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

export const StudentForm = ({ type, data, onSubmit, onClose }: StudentFormProps) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    grade: data?.grade || 10,
    class: data?.class || "10A",
    parent: data?.parent || "Thomas Bennett",
    bloodType: data?.bloodType || "A+",
    birthday: data?.birthday || "2008-01-01",
    sex: data?.sex || "MALE",
    studentId: data?.studentId || `STD-2026-${Math.floor(100 + Math.random() * 900)}`,
    photo:
      data?.photo ||
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      grade: Number(formData.grade),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-base font-bold text-gray-800">
          {type === "create" ? "Register New Student" : `Update Student (${data?.name})`}
        </h1>
        <span className="text-[11px] text-gray-400">Student Enrollment</span>
      </div>

      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
        Personal & Contact Details
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
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
            placeholder="e.g. Lucas Bennett"
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
            placeholder="lucas@lamaedu.com"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Emergency Phone</label>
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
          <label className="text-gray-600 font-medium">Parent / Guardian Name</label>
          <input
            type="text"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
            required
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
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
      </div>

      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-2">
        Academic Placement
      </span>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Grade Level</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          >
            <option value={9}>Grade 9</option>
            <option value={10}>Grade 10</option>
            <option value={11}>Grade 11</option>
            <option value={12}>Grade 12</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Assigned Class Section</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="10A"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Gender</label>
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

      <div className="flex flex-col gap-1">
        <label className="text-gray-600 font-medium">Student Photo URL</label>
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          placeholder="https://..."
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
          {type === "create" ? "Enroll Student" : "Update Student"}
        </button>
      </div>
    </form>
  );
};
export default StudentForm;
