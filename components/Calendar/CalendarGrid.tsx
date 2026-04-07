"use client";

import { memo } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { format } from "date-fns";
import { DayCellData } from "@/types";
import DayCell from "./DayCell";

interface CalendarGridProps {
  dayCells: DayCellData[];
  currentMonth: Date;
  direction: 1 | -1;
  accentColor: string;
  onDateClick: (date: Date) => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const gridVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  }),
};

const CalendarGrid = memo(function CalendarGrid({
  dayCells,
  currentMonth,
  direction,
  accentColor,
  onDateClick,
}: CalendarGridProps) {
  const monthKey = format(currentMonth, "yyyy-MM");

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-[10px] md:text-xs font-700 uppercase tracking-widest py-1
              ${i >= 5 ? "text-rose-400" : "text-[var(--text-muted)]"}`}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={monthKey}
            custom={direction}
            variants={gridVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-7 gap-0.5"
          >
            {dayCells.map((cell, idx) => (
              <DayCell
                key={`${format(cell.date, "yyyy-MM-dd")}-${idx}`}
                data={cell}
                accentColor={accentColor}
                onClick={onDateClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default CalendarGrid;
