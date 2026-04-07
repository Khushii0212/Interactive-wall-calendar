"use client";

import { useState, useCallback, useMemo } from "react";
import { addMonths, subMonths } from "date-fns";

import { buildCalendarGrid, getDayCellData } from "@/lib/utils";

export function useCalendar(notesDates) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });
  const [selectionState, setSelectionState] = useState("idle");
  const [direction, setDirection] = useState(1); 

  const goToPrevMonth = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setDirection(1);
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setDirection(now > currentMonth ? 1 : -1);
    setCurrentMonth(now);
  }, [currentMonth]);

  const handleDateClick = useCallback(
    (date) => {
      if (selectionState === "idle" || selectionState === "selected") {
        setRange({ start: date, end: null });
        setSelectionState("selecting");
      } else if (selectionState === "selecting") {
        setRange((prev) => {
          const start = prev.start;
          if (date >= start) {
            return { start, end: date };
          } else {
            return { start: date, end: start };
          }
        });
        setSelectionState("selected");
      }
    },
    [selectionState]
  );

  const clearSelection = useCallback(() => {
    setRange({ start: null, end: null });
    setSelectionState("idle");
  }, []);

  const gridDays = useMemo(() => buildCalendarGrid(currentMonth), [currentMonth]);

  const dayCells = useMemo(
    () => gridDays.map((date) => getDayCellData(date, currentMonth, range, notesDates)),
    [gridDays, currentMonth, range, notesDates]
  );

  return {
    currentMonth,
    range,
    selectionState,
    direction,
    dayCells,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    clearSelection
  };
}