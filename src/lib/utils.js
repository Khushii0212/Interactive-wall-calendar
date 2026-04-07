import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  getDay } from
"date-fns";


import { getHolidaysForDate } from "./holidays";

export function buildCalendarGrid(currentDate) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd });
}

/** Map a Date to DayCellData */
export function getDayCellData(
date,
currentMonth,
range,
notesDates)
{
  const dayOfWeek = getDay(date);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const hasStart = range.start !== null;
  const hasEnd = range.end !== null;

  const isRangeStart = hasStart ? isSameDay(date, range.start) : false;
  const isRangeEnd = hasEnd ? isSameDay(date, range.end) : false;

  let isInRange = false;
  if (hasStart && hasEnd) {
    const [s, e] =
    range.start.getTime() <= range.end.getTime() ?
    [range.start, range.end] :
    [range.end, range.start];
    isInRange = isWithinInterval(date, { start: s, end: e });
  }

  const isSelected = isRangeStart || isRangeEnd || isInRange;
  const dateKey = format(date, "yyyy-MM-dd");

  return {
    date,
    isCurrentMonth: isSameMonth(date, currentMonth),
    isToday: isToday(date),
    isWeekend,
    isSelected,
    isRangeStart,
    isRangeEnd,
    isInRange,
    hasNotes: notesDates.has(dateKey),
    holidays: getHolidaysForDate(date)
  };
}

export function formatDateRange(start, end) {
  if (!start) return "No date selected";
  if (!end || isSameDay(start, end)) return format(start, "MMM d, yyyy");
  return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ?
  {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } :
  null;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export { format, isSameDay, isSameMonth, isToday };