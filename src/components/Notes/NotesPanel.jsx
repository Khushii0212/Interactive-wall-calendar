"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import {
  StickyNote, Plus, Trash2, Calendar, Sparkles } from
"lucide-react";

import { formatDateRange } from "@/lib/utils";


export default function NotesPanel({
  notes,
  currentMonth,
  selectedRange,
  accentColor,
  onAddNote,
  onDeleteNote
}) {
  const [inputText, setInputText] = useState("");
  const [attachToRange, setAttachToRange] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const textareaRef = useRef(null);

  const hasRange = selectedRange.start !== null;
  const monthStr = format(currentMonth, "yyyy-MM");

  // Filter notes for display
  const filteredNotes = notes.filter((note) => {
    if (activeFilter === "range") return !!note.dateRange;
    if (activeFilter === "general") return !note.dateRange;

    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddNote(inputText, attachToRange && hasRange ? selectedRange : undefined, monthStr);
    setInputText("");
    setAttachToRange(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  useEffect(() => {
    if (hasRange) setAttachToRange(true);else
    setAttachToRange(false);
  }, [hasRange]);

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
     
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5"
            style={{ background: `${accentColor}20` }}>
            
            <StickyNote size={16} style={{ color: accentColor }} />
          </div>
          <h3
            className="text-base font-bold text-[var(--text-primary)] uppercase tracking-wider"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            
            Notes
          </h3>
        </div>
        <span
          className="text-sm px-2.5 py-1 rounded-full font-bold"
          style={{ background: `${accentColor}20`, color: accentColor }}>
          
          {filteredNotes.length}
        </span>
      </div>

      {/* Active range indicator */}
      <AnimatePresence>
        {hasRange &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden">
          
            <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
            style={{
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              color: accentColor
            }}>
            
              <Calendar size={11} />
              <span className="flex-1 truncate">
                {formatDateRange(selectedRange.start, selectedRange.end)}
              </span>
              <Sparkles size={11} />
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div
          className="flex flex-col gap-2 rounded-2xl p-3"
          style={{
            background: "var(--bg-glass)",
            border: "1px solid var(--border)"
          }}>
          
          <textarea
            ref={textareaRef}
            id="note-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
            hasRange && attachToRange ?
            `Note for ${formatDateRange(selectedRange.start, selectedRange.end)}...` :
            "Add a general note for this month..."
            }
            rows={2}
            className="w-full bg-transparent text-[var(--text-primary)] text-base
                       placeholder-[var(--text-muted)] resize-none outline-none
                       font-sans leading-relaxed"


            style={{ maxHeight: "120px", minHeight: "50px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) handleSubmit(e);
            }} />
          

          <div className="flex items-center justify-between">
            {/* Attach toggle */}
            {hasRange &&
            <button
              type="button"
              onClick={() => setAttachToRange(!attachToRange)}
              className="flex items-center gap-1.5 text-xs font-bold
                           transition-all duration-200 rounded-lg px-2.5 py-1.5"

              style={{
                background: attachToRange ? `${accentColor}20` : "transparent",
                color: attachToRange ? accentColor : "var(--text-muted)",
                border: `1px solid ${attachToRange ? accentColor + "40" : "transparent"}`
              }}>
              
                <Calendar size={12} />
                Attach to range
              </button>
            }

            <motion.button
              id="add-note-btn"
              type="submit"
              disabled={!inputText.trim()}
              className="ripple-btn ml-auto flex items-center gap-1.5 px-4 py-2
                         rounded-xl text-sm font-bold text-white
                         disabled:opacity-40 transition-all duration-200"


              style={{ background: accentColor }}
              whileHover={{ scale: 1.04, opacity: 0.95 }}
              whileTap={{ scale: 0.96 }}>
              
              <Plus size={14} strokeWidth={3} />
              Add Note
            </motion.button>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] text-right px-1">⌘ + Enter to add</p>
      </form>

      <div
        className="flex gap-1 p-1 rounded-xl"
        style={{ background: "var(--bg-glass)", border: "1px solid var(--border)" }}>
        
        {["all", "range", "general"].map((tab) =>
        <button
          key={tab}
          onClick={() => setActiveFilter(tab)}
          className="flex-1 text-xs font-bold py-1.5 rounded-lg capitalize
                       transition-all duration-200"

          style={{
            background: activeFilter === tab ? accentColor : "transparent",
            color:
            activeFilter === tab ? "#fff" : "var(--text-muted)"
          }}>
          
            {tab === "all" ? "All" : tab === "range" ? "📅 Range" : "📝 General"}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-0.5">
        <AnimatePresence mode="popLayout">
          {filteredNotes.length === 0 ?
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 gap-3
                         text-[var(--text-muted)] text-center">

            
              <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center opacity-30"
              style={{ background: `${accentColor}20` }}>
              
                <StickyNote size={22} />
              </div>
              <div>
                <p className="text-sm font-bold">No notes yet</p>
                <p className="text-xs mt-1 font-medium text-[var(--text-secondary)]">
                  Select dates and add your first note
                </p>
              </div>
            </motion.div> :

          filteredNotes.map((note) =>
          <NoteCard
            key={note.id}
            note={note}
            accentColor={accentColor}
            onDelete={onDeleteNote} />

          )
          }
        </AnimatePresence>
      </div>
    </div>);

}

function NoteCard({
  note,
  accentColor,
  onDelete




}) {
  const color = note.color ?? accentColor;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-2xl p-3 flex flex-col gap-1.5"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}25`
      }}>
      
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ background: color }} />
      

      {note.dateRange &&
      <div
        className="flex items-center gap-1.5 text-xs font-bold w-fit
                     px-2.5 py-1 rounded-full"

        style={{ background: `${color}20`, color }}>
        
          <Calendar size={11} />
          {note.dateRange.start === note.dateRange.end ?
        format(parseISO(note.dateRange.start), "MMM d") :
        `${format(parseISO(note.dateRange.start), "MMM d")} – ${format(
          parseISO(note.dateRange.end),
          "MMM d"
        )}`}
        </div>
      }

      <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed pl-2 pr-6 break-words">
        {note.text}
      </p>

      <p className="text-xs text-[var(--text-muted)] pl-2">
        {format(parseISO(note.createdAt), "MMM d, h:mm a")}
      </p>

      <motion.button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 w-6 h-6 rounded-lg
                   flex items-center justify-center opacity-0
                   group-hover:opacity-100 transition-all duration-200
                   hover:bg-red-500/20"



        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Delete note">
        
        <Trash2 size={11} className="text-red-400" />
      </motion.button>
    </motion.div>);

}