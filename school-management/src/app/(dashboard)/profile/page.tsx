"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { User, Mail, Phone, MapPin, Shield, Key, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { role } = useApp();

  const getProfileData = () => {
    switch (role) {
      case "teacher":
        return {
          name: "Sarah Jenkins",
          role: "Senior Physics Faculty",
          email: "sarah.j@lamaedu.com",
          phone: "+1 234 567 8902",
          address: "456 Elmwood Ave, Springville, CA",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
          department: "Department of Physics & Natural Sciences",
          joined: "August 2021",
          idTag: "FAC-8890",
        };
      case "student":
        return {
          name: "Lucas Bennett",
          role: "Grade 10 Student",
          email: "lucas.b@lamaedu.com",
          phone: "+1 345 678 9012",
          address: "14 Willow St, Springville, CA",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
          department: "Class Section 10A • STEM Focus",
          joined: "September 2023",
          idTag: "STD-2024-001",
        };
      case "parent":
        return {
          name: "Thomas Bennett",
          role: "Parent Guardian",
          email: "t.bennett@example.com",
          phone: "+1 456 789 0123",
          address: "14 Willow St, Springville, CA",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
          department: "Parent Association Member • Student: Lucas Bennett",
          joined: "September 2023",
          idTag: "PAR-9041",
        };
      case "admin":
      default:
        return {
          name: "Safak K. (Admin)",
          role: "School Administrator",
          email: "admin@schoolama.com",
          phone: "+1 555 019 2831",
          address: "Central School Administration Suite #100",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
          department: "Executive Academic Leadership & Operations",
          joined: "January 2020",
          idTag: "ADM-0001",
        };
    }
  };

  const user = getProfileData();

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto">
      {/* HEADER CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 ring-4 ring-purple-100 shadow-md">
          <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="112px" />
        </div>

        <div className="flex-1 text-center sm:text-left flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full capitalize">
              {role}
            </span>
          </div>
          <p className="text-xs text-gray-500">{user.department}</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-600 flex-wrap mt-1">
            <span className="flex items-center gap-1 font-mono text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-700">
              ID: {user.idTag}
            </span>
            <span className="text-gray-400">•</span>
            <span>Member since {user.joined}</span>
          </div>
        </div>
      </div>

      {/* CREDENTIALS & DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 text-xs">
          <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 border-b pb-2">
            <User className="w-4 h-4 text-purple-600" />
            Contact & Identity Details
          </h3>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </span>
            <span className="font-semibold text-gray-800">{user.email}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Phone
            </span>
            <span className="font-semibold text-gray-800">{user.phone}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Physical Address
            </span>
            <span className="font-semibold text-gray-800 text-right">{user.address}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 text-xs">
          <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 border-b pb-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Security & Authentication
          </h3>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400">Auth Provider</span>
            <span className="font-semibold text-gray-800">Clerk Multi-Role Auth</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
            <span className="text-gray-400">Two-Factor Authentication</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enabled (TOTP)
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-400">Session Status</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold text-[11px]">
              Active Token
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
