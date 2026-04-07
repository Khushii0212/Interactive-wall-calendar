"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { format } from "date-fns";


const STORAGE_KEY = "wall-calendar-notes";

function generateId() {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load notes from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn("Failed to save notes to localStorage", e);
    }
  }, [notes, isLoaded]);

  const addNote = useCallback(
    (text, range, targetMonthStr) => {
      if (!text.trim()) return;
      const note = {
        id: generateId(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
        targetMonth: targetMonthStr,
        color: pickNoteColor(),
        ...(range?.start ?
        {
          dateRange: {
            start: format(range.start, "yyyy-MM-dd"),
            end: format(range.end ?? range.start, "yyyy-MM-dd")
          }
        } :
        {})
      };
      setNotes((prev) => [...prev, note]);
    },
    []
  );

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const updateNote = useCallback((id, text) => {
    setNotes((prev) =>
    prev.map((n) => n.id === id ? { ...n, text } : n)
    );
  }, []);

  const notesDates = useMemo(() => {
    const set = new Set();
    notes.forEach((note) => {
      if (note.dateRange) {
        const start = new Date(note.dateRange.start);
        const end = new Date(note.dateRange.end);
        const current = new Date(start);
        while (current <= end) {
          set.add(format(current, "yyyy-MM-dd"));
          current.setDate(current.getDate() + 1);
        }
      }
    });
    return set;
  }, [notes]);

  const getNotesForMonth = useCallback(
    (month) => {
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      const monthStr = format(month, "yyyy-MM");

      return notes.filter((note) => {
        if (note.dateRange) {
          const start = new Date(note.dateRange.start);
          const end = new Date(note.dateRange.end);
          return start <= monthEnd && end >= monthStart;
        }

        if (note.targetMonth) {
          return note.targetMonth === monthStr;
        }

        const created = new Date(note.createdAt);
        return (
          created.getMonth() === month.getMonth() &&
          created.getFullYear() === month.getFullYear());

      });
    },
    [notes]
  );
  
  const getNotesForRange = useCallback(
    (range) => {
      if (!range.start) return [];
      const startStr = format(range.start, "yyyy-MM-dd");
      const endStr = format(range.end ?? range.start, "yyyy-MM-dd");
      return notes.filter(
        (note) =>
        note.dateRange &&
        note.dateRange.start <= endStr &&
        note.dateRange.end >= startStr
      );
    },
    [notes]
  );

  return {
    notes,
    notesDates,
    addNote,
    deleteNote,
    updateNote,
    getNotesForMonth,
    getNotesForRange,
    isLoaded
  };
}

const NOTE_COLORS = [
"#6366f1", // indigo
"#ec4899", // pink
"#10b981", // emerald
"#f59e0b", // amber
"#3b82f6", // blue
"#8b5cf6", // violet
"#14b8a6" // teal
];
let colorIndex = 0;
function pickNoteColor() {
  const color = NOTE_COLORS[colorIndex % NOTE_COLORS.length];
  colorIndex++;
  return color;
}