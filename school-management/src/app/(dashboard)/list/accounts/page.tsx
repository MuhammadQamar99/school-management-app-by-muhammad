"use client";

import React, { FormEvent, useState } from "react";
import { useApp, UserAccount } from "@/context/AppContext";
import { KeyRound, Plus, ShieldCheck, Trash2, UserPlus, Users } from "lucide-react";

const roles = ["teacher", "student", "parent"] as const;

type FormState = {
  name: string;
  email: string;
  username: string;
  password: string;
  role: (typeof roles)[number];
  classSection: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  username: "",
  password: "",
  role: "student",
  classSection: "",
};

const roleStyle: Record<UserAccount["role"], string> = {
  admin: "bg-purple-100 text-purple-800",
  teacher: "bg-sky-100 text-sky-800",
  student: "bg-amber-100 text-amber-800",
  parent: "bg-emerald-100 text-emerald-800",
};

export default function AccountsPage() {
  const { accounts, createAccount, deleteAccount, role } = useApp();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  if (role !== "admin") {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <ShieldCheck className="mx-auto mb-3 h-9 w-9 text-red-500" />
        <h1 className="text-lg font-bold text-gray-900">Administrator access required</h1>
        <p className="mt-1 text-sm text-gray-500">Only the school administration can manage portal accounts.</p>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password kam az kam 6 characters ka hona chahiye.");
      return;
    }

    const result = createAccount({
      ...form,
      classSection: form.classSection.trim() || undefined,
    });
    if (!result.success) {
      setError(result.message || "Account create nahi ho saka.");
      return;
    }

    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-700 p-5 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold">Portal Accounts</h1>
            <p className="text-xs text-violet-100">Create credentials for teachers, students, and parents.</p>
          </div>
        </div>
        <button
          onClick={() => { setShowForm((value) => !value); setError(""); }}
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-violet-800 transition hover:bg-violet-50"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Close Form" : "Create Account"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-violet-700" />
            <h2 className="font-bold text-gray-900">New user credentials</h2>
          </div>
          {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700">{error}</p>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Field label="Full Name" value={form.name} required onChange={(name) => setForm({ ...form, name })} placeholder="e.g. Ali Khan" />
            <Field label="Email Address" value={form.email} required type="email" onChange={(email) => setForm({ ...form, email })} placeholder="ali@school.edu" />
            <Field label="Username" value={form.username} required onChange={(username) => setForm({ ...form, username })} placeholder="e.g. ali.khan" />
            <Field label="Temporary Password" value={form.password} required type="password" minLength={6} onChange={(password) => setForm({ ...form, password })} placeholder="Minimum 6 characters" />
            <label className="flex flex-col gap-1.5 text-xs font-bold text-gray-700">
              Account Role
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as FormState["role"] })} className="rounded-xl border border-gray-300 bg-white p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500">
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
            </label>
            <Field label="Class / Section (optional)" value={form.classSection} onChange={(classSection) => setForm({ ...form, classSection })} placeholder="e.g. 10A" />
          </div>
          <div className="mt-5 flex justify-end">
            <button type="submit" className="rounded-xl bg-violet-700 px-5 py-3 text-xs font-bold text-white transition hover:bg-violet-800">Create Login Account</button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-violet-700" />
            <h2 className="font-bold text-gray-900">All portal accounts</h2>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">{accounts.length} accounts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-400">
              <tr><th className="p-3">User</th><th className="p-3">Username</th><th className="p-3">Role</th><th className="p-3">Section</th><th className="p-3">Created</th><th className="p-3 text-center">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50/70">
                  <td className="p-3"><p className="font-bold text-gray-800">{account.name}</p><p className="mt-0.5 text-gray-400">{account.email}</p></td>
                  <td className="p-3 font-mono font-semibold text-gray-700">{account.username}</td>
                  <td className="p-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${roleStyle[account.role]}`}>{account.role}</span></td>
                  <td className="p-3 text-gray-600">{account.classSection || "—"}</td>
                  <td className="p-3 text-gray-400">{account.createdAt}</td>
                  <td className="p-3 text-center">
                    {account.role === "admin" ? <span className="text-[10px] font-bold text-gray-400">Protected</span> : <button onClick={() => deleteAccount(account.id)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-bold text-red-600 transition hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Remove</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"><strong>Demo storage:</strong> Accounts are saved in this browser only. For a real live school system, passwords must be hashed and accounts saved in a secured database.</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false, minLength }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean; minLength?: number }) {
  return <label className="flex flex-col gap-1.5 text-xs font-bold text-gray-700">{label}<input type={type} value={value} required={required} minLength={minLength} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="rounded-xl border border-gray-300 bg-white p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500" /></label>;
}
