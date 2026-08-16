"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, AlertTriangle } from "lucide-react";
import { TeacherForm } from "./forms/TeacherForm";
import { StudentForm } from "./forms/StudentForm";
import { GenericForm } from "./forms/GenericForms";
import { useApp } from "@/context/AppContext";

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}

export const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const { addItem, updateItem, deleteItem } = useApp();

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow hover:bg-yellow-400 text-amber-950"
      : type === "update"
      ? "bg-lamaSky hover:bg-sky-300 text-blue-950"
      : "bg-lamaPurple hover:bg-purple-300 text-purple-950";

  const getIcon = () => {
    switch (type) {
      case "create":
        return <Plus className="w-4 h-4" />;
      case "update":
        return <Edit2 className="w-3.5 h-3.5" />;
      case "delete":
        return <Trash2 className="w-3.5 h-3.5" />;
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (type === "create") {
      addItem(table, formData);
    } else if (type === "update" && (id || data?.id)) {
      updateItem(table, id || data.id, formData);
    }
    setOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (id || data?.id) {
      deleteItem(table, id || data.id);
    }
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} flex items-center justify-center rounded-full ${bgColor} shadow-2xs transition-all hover:scale-105`}
        title={`${type.toUpperCase()} ${table}`}
      >
        {getIcon()}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl relative w-[95%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[42%] max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {type === "delete" ? (
              <div className="p-4 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-inner">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Confirm Deletion</h2>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm">
                    All associated records for this <strong>{table}</strong> (#{id || data?.id}) will be permanently deleted from the database.
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition shadow-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Yes, Delete Record
                  </button>
                </div>
              </div>
            ) : table === "teacher" ? (
              <TeacherForm
                type={type}
                data={data}
                onSubmit={handleFormSubmit}
                onClose={() => setOpen(false)}
              />
            ) : table === "student" ? (
              <StudentForm
                type={type}
                data={data}
                onSubmit={handleFormSubmit}
                onClose={() => setOpen(false)}
              />
            ) : (
              <GenericForm
                table={table}
                type={type}
                data={data}
                onSubmit={handleFormSubmit}
                onClose={() => setOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default FormModal;
