"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { UserCheck, Check, X, Clock } from "lucide-react";

export const AccessRequests = () => {
  const { roleRequests, approveRoleRequest, rejectRoleRequest, role } = useApp();

  if (role !== "admin") return null;

  const pendingCount = roleRequests.filter((r) => r.status === "PENDING").length;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800">Pending Role Requests &amp; Approvals</h2>
            <p className="text-[11px] text-gray-400">
              Review new applicant registrations and assign role access
            </p>
          </div>
        </div>

        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
          <Clock className="w-3.5 h-3.5" />
          {pendingCount} Pending
        </span>
      </div>

      {/* REQUESTS LIST */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase text-[10px]">
              <th className="py-2 px-3">Applicant Name</th>
              <th className="py-2 px-3">Requested Role</th>
              <th className="py-2 px-3">Details / Class</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3 text-center">Decision Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {roleRequests.length > 0 ? (
              roleRequests.map((req) => {
                const isPending = req.status === "PENDING";

                const roleBadge = {
                  student: "bg-lamaYellowLight text-amber-900 border-amber-200",
                  teacher: "bg-lamaSkyLight text-blue-900 border-sky-200",
                  parent: "bg-emerald-50 text-emerald-900 border-emerald-200",
                };

                return (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{req.name}</span>
                        <span className="text-[11px] text-gray-400">{req.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          roleBadge[req.requestedRole]
                        }`}
                      >
                        {req.requestedRole}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      {req.classSection && <span>Section: <strong>Class {req.classSection}</strong></span>}
                      {req.subjects && <span>Subjects: <strong>{req.subjects}</strong></span>}
                      {req.childName && <span>Child: <strong>{req.childName}</strong></span>}
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-400 text-[11px]">{req.createdAt}</td>
                    <td className="py-3 px-3">
                      {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => approveRoleRequest(req.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-xs transition flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => rejectRoleRequest(req.id)}
                            className="px-2.5 py-1 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 rounded-lg font-bold text-[11px] transition flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            Decline
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              req.status === "APPROVED"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400 text-xs">
                  No pending role requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AccessRequests;