"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export const ToastContainer = () => {
  const { notifications, removeToast } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const icons = {
          success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
        };

        const bg = {
          success: "border-emerald-200 bg-white",
          error: "border-red-200 bg-white",
          warning: "border-amber-200 bg-white",
          info: "border-blue-200 bg-white",
        };

        return (
          <div
            key={n.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-start gap-3 transition-all animate-in slide-in-from-bottom-2 ${
              bg[n.type]
            }`}
          >
            {icons[n.type]}
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-800">{n.title}</h4>
                <span className="text-[10px] text-gray-400 font-mono">{n.time}</span>
              </div>
              <p className="text-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
            <button
              onClick={() => removeToast(n.id)}
              className="text-gray-400 hover:text-gray-700 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default ToastContainer;
