"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Clock, ShieldCheck, RefreshCw } from "lucide-react";

export default function PendingApprovalPage() {
  const { roleRequests, addToast } = useApp();
  const myRequest = roleRequests[0];

  const handleRefresh = () => {
    addToast("Status Checked", "Your account status is currently: PENDING ADMIN APPROVAL", "info");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 text-center flex flex-col items-center gap-5 animate-in fade-in zoom-in-95">
        {/* ICON */}
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner relative">
          <Clock className="w-8 h-8" />
        </div>

        {/* TITLE */}
        <div>
          <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full uppercase tracking-wider">
            Registration Status: Pending
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-2 tracking-tight">
            Account Under Administrative Review
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Thank you for registering. Your request has been forwarded to the Principal &amp; Academic Administration.
          </p>
        </div>

        {/* DETAILS CARD */}
        {myRequest && (
          <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left text-xs flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-400 font-medium">Applicant Name:</span>
              <span className="font-bold text-gray-800">{myRequest.name}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-400 font-medium">Requested Role:</span>
              <span className="font-bold text-purple-700 uppercase bg-purple-100 px-2 py-0.5 rounded">
                {myRequest.requestedRole}
              </span>
            </div>
            {myRequest.classSection && (
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-400 font-medium">Requested Section:</span>
                <span className="font-bold text-gray-800">Class {myRequest.classSection}</span>
              </div>
            )}
            {myRequest.subjects && (
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-400 font-medium">Subjects:</span>
                <span className="font-bold text-gray-800">{myRequest.subjects}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Submission Timestamp:</span>
              <span className="font-mono text-gray-600">{myRequest.createdAt}</span>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={handleRefresh}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Check Approval Status
          </button>

          <Link
            href="/admin"
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Admin Demo View
          </Link>
        </div>

        {/* SUPPORT */}
        <p className="text-[11px] text-gray-400">
          Need urgent access? Contact school registrar at{" "}
          <strong className="text-gray-600">admin@schoolama.com</strong>
        </p>
      </div>
    </div>
  );
}