"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import { cn } from "@/lib/utils";

const DayCell = memo(function DayCell({ data, accentColor, onClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    date,
    isCurrentMonth,
    isToday,
    isWeekend,
    isRangeStart,
    isRangeEnd,
    isInRange,
    hasNotes,
    holidays
  } = data;

  const hasHoliday = holidays.length > 0;
  const dayNum = date.getDate();

  const handleClick = () => onClick(date);

  const cellClasses = cn(
    "day-cell",
    "relative flex flex-col items-center justify-center",
    "w-full aspect-square rounded-xl transition-all duration-200",
    "cursor-pointer select-none group",
    !isCurrentMonth && "opacity-30",
    isCurrentMonth && !isRangeStart && !isRangeEnd && !isToday && "hover:bg-white/10 dark:hover:bg-white/5"
  );

  const getCircleStyle = () => {
    if (isRangeStart || isRangeEnd) {
      return {
        background: accentColor,
        color: "#fff",
        boxShadow: `0 4px 16px ${accentColor}60`
      };
    }
    if (isToday && !isInRange) {
      return {
        border: `2px solid ${accentColor}`,
        color: accentColor
      };
    }
    return {};
  };

  const circleClasses = cn(
    "relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-full",
    "flex items-center justify-center",
    "text-sm md:text-base font-bold transition-all duration-200",
    isRangeStart || isRangeEnd ?
    "scale-110" :
    isToday && !isInRange ?
    "" :
    isInRange ?
    "text-white/90" :
    isWeekend && isCurrentMonth ?
    "text-rose-400 dark:text-rose-400" :
    "text-[var(--text-primary)]"
  );

  return (
    <motion.div
      className={cellClasses}
      onClick={handleClick}
      onMouseEnter={() => hasHoliday && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={{ scale: isCurrentMonth ? 1.08 : 1 }}
      whileTap={{ scale: 0.95 }}
      layout>
      
   
      {isInRange && !isRangeStart && !isRangeEnd &&
      <div
        className="absolute inset-y-1 inset-x-0 z-0 rounded-none"
        style={{ background: `${accentColor}22` }} />

      }

      {isRangeStart && !isRangeEnd &&
      <div
        className="absolute inset-y-1 right-0 left-1/2 z-0"
        style={{ background: `${accentColor}22` }} />

      }

      {isRangeEnd && !isRangeStart &&
      <div
        className="absolute inset-y-1 left-0 right-1/2 z-0"
        style={{ background: `${accentColor}22` }} />

      }

      <motion.div
        className={circleClasses}
        style={getCircleStyle()}
        animate={isRangeStart || isRangeEnd ? { scale: [1, 1.15, 1.1] } : {}}
        transition={{ duration: 0.3 }}>
        
        {dayNum}
      </motion.div>

      {hasHoliday &&
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          {holidays.slice(0, 3).map((h, i) =>
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: h.color }} />

        )}
        </div>
      }

      {hasNotes && !hasHoliday &&
      <div
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{ background: accentColor }} />

      }

      {isToday &&
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: `0 0 0 2px ${accentColor}40`
        }} />

      }

      <AnimatePresence>
        {showTooltip && hasHoliday &&
        <motion.div
          className="tooltip"
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          transition={{ duration: 0.15 }}>
          
            {holidays.map((h, i) =>
          <span key={i} className="block text-center">
                {h.emoji} {h.name}
              </span>
          )}
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>);

});

export default DayCell;