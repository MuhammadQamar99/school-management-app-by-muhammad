"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { GraduationCap, BookOpen, Users, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { submitRoleRequest } = useApp();

  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "parent">("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    classSection: "10A",
    subjects: "Physics, Mathematics",
    childName: "Lucas Bennett",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRoleRequest({
      name: formData.name || "New Applicant",
      email: formData.email || "applicant@example.com",
      requestedRole: selectedRole,
      classSection: selectedRole === "student" ? formData.classSection : undefined,
      subjects: selectedRole === "teacher" ? formData.subjects : undefined,
      childName: selectedRole === "parent" ? formData.childName : undefined,
    });

    router.push("/pending-approval");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md mb-3">
            <GraduationCap className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold bg-purple-100 text-purple-900 px-3 py-1 rounded-full uppercase tracking-wider">
            Step 1 of 2 • School Onboarding
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-2 tracking-tight">
            Welcome to SchooLama
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto leading-relaxed">
            Please choose your role in the institution. The school administration will review and activate your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* ROLE SELECTOR CARDS */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
              I am joining as a:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* STUDENT */}
              <div
                onClick={() => setSelectedRole("student")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  selectedRole === "student"
                    ? "border-purple-600 bg-purple-50/70 shadow-sm scale-102"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition ${
                    selectedRole === "student" ? "bg-purple-600 text-white" : "bg-lamaYellow text-amber-950"
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900">Student</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Enrolled pupil</p>
                </div>
              </div>

              {/* TEACHER */}
              <div
                onClick={() => setSelectedRole("teacher")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  selectedRole === "teacher"
                    ? "border-blue-600 bg-blue-50/70 shadow-sm scale-102"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition ${
                    selectedRole === "teacher" ? "bg-blue-600 text-white" : "bg-lamaSky text-blue-950"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900">Teacher</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Faculty staff</p>
                </div>
              </div>

              {/* PARENT */}
              <div
                onClick={() => setSelectedRole("parent")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                  selectedRole === "parent"
                    ? "border-emerald-600 bg-emerald-50/70 shadow-sm scale-102"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition ${
                    selectedRole === "parent" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-950"
                  }`}
                >
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900">Parent</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Family guardian</p>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC ROLE DETAILS */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col gap-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Qamar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-2.5 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-2.5 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="p-2.5 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {selectedRole === "student" && (
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Assigned Class Section</label>
                <select
                  value={formData.classSection}
                  onChange={(e) => setFormData({ ...formData, classSection: e.target.value })}
                  className="p-2.5 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                >
                  <option value="10A">Class 10A (Science Section)</option>
                  <option value="10B">Class 10B (Arts Section)</option>
                  <option value="9A">Class 9A</option>
                  <option value="9B">Class 9B</option>
                  <option value="11A">Class 11A (Pre-Engineering)</option>
                  <option value="11B">Class 11B (Pre-Medical)</option>
                  <option value="12A">Class 12A (Senior)</option>
                </select>
              </div>
            )}

            {selectedRole === "teacher" && (
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Teaching Subjects (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics, Chemistry, Mathematics"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="p-2.5 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {selectedRole === "parent" && (
              <div className="flex flex-col gap-1">
                <label className="font-bold text-gray-700">Enrolled Child&apos;s Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lucas Bennett"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  className="p-2.5 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            Submit for School Approval
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}