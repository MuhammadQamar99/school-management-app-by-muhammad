"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Send, MessageSquare, Phone, Video, Search, CheckCheck } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

interface ChatContact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  messages: ChatMessage[];
}

export default function MessagesPage() {
  const { role, addToast } = useApp();
  const [inputText, setInputText] = useState("");

  const [contacts, setContacts] = useState<ChatContact[]>([
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Physics & Science Head",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      lastMessage: "The laboratory reports for Class 10A have been evaluated.",
      time: "10:24 AM",
      unread: 1,
      messages: [
        { id: 1, sender: "them", text: "Hello! Just wanted to share the updated lab schedule.", time: "10:15 AM" },
        { id: 2, sender: "me", text: "Thank you Sarah! Are all equipment sets ready?", time: "10:18 AM" },
        { id: 3, sender: "them", text: "Yes, calibrated and arranged for tomorrow morning.", time: "10:24 AM" },
      ],
    },
    {
      id: 2,
      name: "Thomas Bennett",
      role: "Parent (Lucas Bennett, 10A)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      lastMessage: "Thank you for the update on the math competition.",
      time: "Yesterday",
      messages: [
        { id: 1, sender: "them", text: "Good afternoon, will Lucas need any extra study materials?", time: "Yesterday" },
        { id: 2, sender: "me", text: "The module worksheets on the portal are sufficient!", time: "Yesterday" },
      ],
    },
    {
      id: 3,
      name: "Alexander Dean",
      role: "Mathematics Supervisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      lastMessage: "Mid-term exam questions submitted for review.",
      time: "2 days ago",
      messages: [
        { id: 1, sender: "them", text: "I've drafted the mid-term paper for Class 10.", time: "2 days ago" },
      ],
    },
  ]);

  const [activeContactId, setActiveContactId] = useState<number>(1);
  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              lastMessage: inputText.trim(),
              time: "Just now",
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    setInputText("");
    addToast("Message Sent", `Delivered to ${activeContact.name}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-140px)] min-h-[550px]">
      {/* CONTACTS LIST */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Direct Messages
            </h2>
            <p className="text-[11px] text-gray-400">Faculty & Parent Communications</p>
          </div>
        </div>

        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl text-xs">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="bg-transparent outline-none text-xs text-gray-700 w-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveContactId(c.id)}
              className={`p-3.5 flex items-center gap-3 cursor-pointer transition ${
                c.id === activeContactId
                  ? "bg-lamaSkyLight border-l-4 border-l-purple-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image src={c.avatar} alt={c.name} fill className="object-cover" sizes="40px" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-gray-800 truncate">{c.name}</h4>
                  <span className="text-[10px] text-gray-400 font-mono">{c.time}</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate">{c.role}</p>
                <p className="text-[11px] text-gray-600 truncate mt-0.5">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50/50">
        {/* CHAT HEADER */}
        <div className="p-3.5 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
              <Image
                src={activeContact.avatar}
                alt={activeContact.name}
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-800">{activeContact.name}</h3>
              <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active Now • {activeContact.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition">
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition">
              <Video className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MESSAGES BUBBLES */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {activeContact.messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[75%] ${
                m.sender === "me" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === "me"
                    ? "bg-purple-600 text-white rounded-br-xs shadow-xs"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-xs shadow-2xs"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                {m.time}
                {m.sender === "me" && <CheckCheck className="w-3 h-3 text-purple-600" />}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT BOX */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeContact.name}...`}
            className="flex-1 bg-gray-50 text-xs text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:bg-white focus:ring-1 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
