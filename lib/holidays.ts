import { Holiday } from "@/types";

export const HOLIDAYS: Holiday[] = [
  // January
  { date: "01-01", name: "New Year's Day", color: "#f59e0b", emoji: "🎊" },
  { date: "01-15", name: "Martin Luther King Jr. Day", color: "#6366f1", emoji: "✊" },
  { date: "01-26", name: "Republic Day", color: "#10b981", emoji: "🇮🇳" },

  // February
  { date: "02-14", name: "Valentine's Day", color: "#ef4444", emoji: "❤️" },
  { date: "02-19", name: "Presidents' Day", color: "#3b82f6", emoji: "🏛️" },

  // March
  { date: "03-08", name: "International Women's Day", color: "#ec4899", emoji: "💜" },
  { date: "03-17", name: "St. Patrick's Day", color: "#22c55e", emoji: "☘️" },

  // April
  { date: "04-07", name: "World Health Day", color: "#06b6d4", emoji: "🌍" },
  { date: "04-22", name: "Earth Day", color: "#84cc16", emoji: "🌱" },

  // May
  { date: "05-01", name: "International Workers' Day", color: "#ef4444", emoji: "✊" },
  { date: "05-12", name: "Mother's Day", color: "#f472b6", emoji: "💐" },

  // June
  { date: "06-05", name: "World Environment Day", color: "#22c55e", emoji: "🌿" },
  { date: "06-21", name: "Father's Day", color: "#3b82f6", emoji: "👔" },
  { date: "06-21", name: "Summer Solstice", color: "#f59e0b", emoji: "☀️" },

  // July
  { date: "07-04", name: "Independence Day", color: "#3b82f6", emoji: "🎆" },

  // August
  { date: "08-15", name: "Independence Day (India)", color: "#f97316", emoji: "🇮🇳" },

  // September
  { date: "09-05", name: "Teachers' Day", color: "#8b5cf6", emoji: "📚" },

  // October
  { date: "10-02", name: "Gandhi Jayanti", color: "#f59e0b", emoji: "🕊️" },
  { date: "10-31", name: "Halloween", color: "#f97316", emoji: "🎃" },

  // November
  { date: "11-11", name: "Veterans Day", color: "#6366f1", emoji: "🎖️" },
  { date: "11-14", name: "Children's Day", color: "#ec4899", emoji: "🧒" },

  // December
  { date: "12-25", name: "Christmas Day", color: "#ef4444", emoji: "🎄" },
  { date: "12-31", name: "New Year's Eve", color: "#f59e0b", emoji: "🥂" },
];

export function getHolidaysForDate(date: Date): Holiday[] {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;
  return HOLIDAYS.filter((h) => h.date === key);
}
