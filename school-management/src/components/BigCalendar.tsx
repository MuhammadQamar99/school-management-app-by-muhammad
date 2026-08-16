"use client";

import React, { useState } from "react";
import { timetableEvents } from "@/lib/data";
import { Clock, MapPin, User, BookOpen, Calendar, Info, X } from "lucide-react";
import { TimetableEvent } from "@/types";

export const BigCalendar = ({ filterTeacher, filterClass }: { filterTeacher?: string; filterClass?: string }) => {
  const [selectedView, setSelectedView] = useState<"week" | "day">("week");
  const [activeDay, setActiveDay] = useState<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday">("Monday");
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);

  const days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const timeSlots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00 (Lunch)",
    "13:00 - 14:00",
    "14:00 - 15:00",
  ];

  let filteredEvents = timetableEvents;
  if (filterTeacher) {
    filteredEvents = filteredEvents.filter((e) =>
      e.teacher.toLowerCase().includes(filterTeacher.toLowerCase())
    );
  }
  if (filterClass) {
    filteredEvents = filteredEvents.filter((e) =>
      e.class.toLowerCase().includes(filterClass.toLowerCase())
    );
  }

  const getEventsForDayAndTime = (day: string, slotIdx: number) => {
    const slotHour = 8 + slotIdx;
    return filteredEvents.filter((ev) => {
      if (ev.day !== day) return false;
      const [hour] = ev.startTime.split(":").map(Number);
      return hour === slotHour;
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <div>
            <h2 className="text-sm font-bold text-gray-800">Weekly Class Schedule</h2>
            <p className="text-[11px] text-gray-400">Academic Year 2026/27 • Term 1</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setSelectedView("week")}
              className={`px-3 py-1 rounded-md font-semibold transition ${
                selectedView === "week"
                  ? "bg-white text-purple-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Work Week
            </button>
            <button
              onClick={() => setSelectedView("day")}
              className={`px-3 py-1 rounded-md font-semibold transition ${
                selectedView === "day"
                  ? "bg-white text-purple-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Day View
            </button>
          </div>
        </div>
      </div>

      {selectedView === "day" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeDay === d
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {/* WEEK TABLE VIEW */}
      {selectedView === "week" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-2.5 px-3 text-gray-400 font-medium w-24 text-[11px]">Time</th>
                {days.map((d) => (
                  <th key={d} className="py-2.5 px-3 text-gray-700 font-bold text-center">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {timeSlots.map((slot, sIdx) => {
                const isLunch = slot.includes("Lunch");
                if (isLunch) {
                  return (
                    <tr key={slot} className="bg-amber-50/50">
                      <td className="py-2 px-3 text-[11px] text-amber-800 font-medium">{slot}</td>
                      <td colSpan={5} className="py-2 px-3 text-center text-[11px] text-amber-700 font-medium tracking-wide">
                        🍽️ Midday Lunch Break &amp; Campus Recreation
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={slot} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 text-[11px] text-gray-400 font-mono align-top">
                      {slot.split(" - ")[0]}
                    </td>
                    {days.map((day) => {
                      const dayEvents = getEventsForDayAndTime(day, sIdx);
                      return (
                        <td key={day} className="p-1.5 align-top h-20 w-[18%]">
                          {dayEvents.map((ev) => (
                            <div
                              key={ev.id}
                              onClick={() => setSelectedEvent(ev)}
                              className={`${ev.colorBg} ${ev.colorBorder} border-l-4 p-2 rounded-lg shadow-2xs cursor-pointer hover:shadow-sm hover:scale-[1.02] transition flex flex-col gap-1`}
                            >
                              <span className="font-bold text-gray-800 text-[11px] line-clamp-1">
                                {ev.title}
                              </span>
                              <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                                <span>{ev.startTime}</span>
                                <span className="bg-white/80 px-1 rounded text-gray-700 font-medium">
                                  {ev.room}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-600 line-clamp-1">
                                {ev.teacher}
                              </span>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* DAY VIEW */
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl border border-purple-100">
            <h3 className="font-bold text-sm text-purple-900">{activeDay}&apos;s Schedule</h3>
            <span className="text-xs text-purple-700 font-medium">
              {filteredEvents.filter((e) => e.day === activeDay).length} Scheduled Sessions
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {filteredEvents
              .filter((e) => e.day === activeDay)
              .map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className={`${ev.colorBg} ${ev.colorBorder} border-l-4 p-3 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-xs transition`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-2xs text-purple-700">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-800">{ev.title}</h4>
                      <p className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          {ev.teacher}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {ev.room}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
                      {ev.startTime} - {ev.endTime}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">Class: {ev.class}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* EVENT POPUP MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-lamaPurple flex items-center justify-center text-purple-900 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{selectedEvent.title}</h3>
                <span className="text-xs text-purple-600 font-semibold">{selectedEvent.day}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Time:
                </span>
                <span className="font-mono font-bold text-gray-800">
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Instructor:
                </span>
                <span className="font-semibold text-gray-800">{selectedEvent.teacher}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Location:
                </span>
                <span className="font-semibold text-gray-800">{selectedEvent.room}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Class Section:</span>
                <span className="font-semibold text-gray-800">{selectedEvent.class}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-xs transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default BigCalendar;
