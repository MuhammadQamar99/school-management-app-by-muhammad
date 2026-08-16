"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MoreHorizontal, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const { events } = useApp();

  const borderColors = [
    "border-t-4 border-t-lamaSky bg-lamaSkyLight/40",
    "border-t-4 border-t-lamaPurple bg-lamaPurpleLight/40",
    "border-t-4 border-t-lamaYellow bg-lamaYellowLight/40",
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      {/* CALENDAR */}
      <div className="event-calendar-wrapper">
        <Calendar onChange={onChange} value={value} locale="en-US" />
      </div>

      {/* EVENTS LIST */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-purple-600" />
            <h1 className="text-sm font-bold text-gray-800">Upcoming Events</h1>
          </div>
          <Link href="/list/events" className="text-xs text-purple-600 hover:underline font-semibold">
            View All
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {events.slice(0, 3).map((event, index) => (
            <div
              key={event.id}
              className={`p-3 rounded-xl border border-gray-100 shadow-2xs transition hover:shadow-xs ${
                borderColors[index % borderColors.length]
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold text-xs text-gray-800">{event.title}</h2>
                <span className="text-[10px] text-gray-500 bg-white/80 px-1.5 py-0.5 rounded font-mono font-medium">
                  {event.startTime}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {event.date} ({event.startTime} - {event.endTime})
                </span>
                <span className="bg-white/80 text-gray-600 px-1.5 py-0.2 rounded font-semibold">
                  {event.class}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EventCalendar;
