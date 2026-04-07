"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const NUM_RINGS = 14;

export default function CalendarHeader({
  currentMonth,
  accentColor,
  onPrev,
  onNext,
  onToday
}) {
  const monthName = format(currentMonth, "MMMM");
  const year = format(currentMonth, "yyyy");

  return (
    <div className="flex flex-col w-full">
  
      <div className="flex items-center justify-center gap-[6px] py-2 px-4 relative">
      
        <div
          className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-[3px] rounded-full opacity-20"
          style={{ background: accentColor }} />
        
        {Array.from({ length: NUM_RINGS }).map((_, i) =>
        <motion.div
          key={i}
          className="spiral-ring"
          style={{ borderColor: `${accentColor}80` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.03, type: "spring", stiffness: 300 }} />

        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <motion.button
          id="prev-month-btn"
          onClick={onPrev}
          className="ripple-btn w-9 h-9 rounded-xl flex items-center justify-center
                     bg-white/10 dark:bg-white/5 border border-[var(--border)]
                     hover:border-[var(--accent)] hover:text-[var(--accent)]
                     text-[var(--text-secondary)] transition-all duration-200"



          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous month">
          
          <ChevronLeft size={16} strokeWidth={2.5} />
        </motion.button>

        <div className="flex flex-col items-center gap-0.5 flex-1">
          <motion.h2
            key={format(currentMonth, "yyyy-MM")}
            className="text-2xl md:text-3xl font-black tracking-tight leading-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: accentColor
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            
            {monthName}
          </motion.h2>
          <motion.span
            key={year}
            className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}>
            
            {year}
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            id="go-today-btn"
            onClick={onToday}
            className="ripple-btn text-[10px] font-bold px-3 py-1.5 rounded-lg
                       border border-[var(--border)] text-[var(--text-secondary)]
                       hover:border-[var(--accent)] hover:text-[var(--accent)]
                       transition-all duration-200 hidden sm:flex items-center gap-1"



            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to today">
            
            <CalendarDays size={11} />
            Today
          </motion.button>

          <motion.button
            id="next-month-btn"
            onClick={onNext}
            className="ripple-btn w-9 h-9 rounded-xl flex items-center justify-center
                       bg-white/10 dark:bg-white/5 border border-[var(--border)]
                       hover:border-[var(--accent)] hover:text-[var(--accent)]
                       text-[var(--text-secondary)] transition-all duration-200"



            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next month">
            
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>);

}