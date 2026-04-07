"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { X, MousePointerClick, CalendarRange, Sparkles, Info } from "lucide-react";

import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import HeroImage from "./HeroImage";
import NotesPanel from "@/components/Notes/NotesPanel";
import ThemeToggle from "@/components/UI/ThemeToggle";

import { useCalendar } from "@/hooks/useCalendar";
import { useNotes } from "@/hooks/useNotes";
import { getHeroForMonth } from "@/lib/heroImages";
import { formatDateRange } from "@/lib/utils";

function hexToRgbStr(hex: string): string | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? `${parseInt(m[1],16)}, ${parseInt(m[2],16)}, ${parseInt(m[3],16)}` : null;
}

function applyAccent(hex: string) {
  document.documentElement.style.setProperty("--accent", hex);
  const rgb = hexToRgbStr(hex);
  if (rgb) document.documentElement.style.setProperty("--accent-rgb", rgb);
}

export default function WallCalendar() {
  const { notes, notesDates, addNote, deleteNote, getNotesForMonth } = useNotes();
  const {
    currentMonth, range, selectionState, direction, dayCells,
    goToPrevMonth, goToNextMonth, goToToday, handleDateClick, clearSelection,
  } = useCalendar(notesDates);

  const hero = getHeroForMonth(currentMonth.getMonth());
  const [accentColor, setAccentColor] = useState(hero.dominantColor);
  const [showMobileNotes, setShowMobileNotes] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setAccentColor(hero.dominantColor);
    applyAccent(hero.dominantColor);
  }, [hero.dominantColor]);

  const handleColorsExtracted = useCallback(
    (colors: { dominant: string }) => {
      setAccentColor(colors.dominant);
      applyAccent(colors.dominant);
    }, []
  );

  useEffect(() => {
    if (selectionState === "selected") setShowHint(false);
  }, [selectionState]);

  const monthNotes = getNotesForMonth(currentMonth);

  return (
    <>
      <style>{`
        .wc-container { width: 100%; max-width: 1100px; margin: 0 auto; }
        .wc-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding: 0 4px; }
        .wc-card {
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-card);
          backdrop-filter: blur(32px) saturate(1.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8);
        }
        .wc-inner {
          display: flex;
          flex-direction: row;
          min-height: 740px;
        }
        .wc-left {
          width: 38%;
          min-width: 260px;
          max-width: 420px;
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
        }
        .wc-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          border-left: 1px solid var(--border);
        }
        .wc-calendar-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 14px 18px 10px;
        }
        .wc-divider { height: 1px; background: var(--border); margin: 0 18px; }
        .wc-notes-section {
          padding: 16px 20px 20px;
          max-height: 360px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .wc-mobile-hero { display: none; }
        .wc-mobile-notes-btn { display: none; }
        .wc-footer { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 14px; }

        @media (max-width: 767px) {
          .wc-left { display: none !important; }
          .wc-mobile-hero { display: block; height: 200px; position: relative; overflow: hidden; }
          .wc-inner { flex-direction: column; min-height: auto; }
          .wc-right { border-left: none; border-top: 1px solid var(--border); }
          .wc-notes-section { display: none; }
          .wc-mobile-notes-btn { display: flex; }
          .wc-mobile-notes-panel {
            border-radius: 24px; overflow: hidden;
            border: 1px solid var(--border);
            background: var(--bg-card);
            backdrop-filter: blur(24px);
            padding: 16px 18px 20px;
            margin-top: 12px;
            max-height: 380px;
            overflow-y: auto;
          }
        }
      `}</style>

      <div className="wc-container">
        <div className="wc-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.div
              style={{
                width: 40, height: 40, borderRadius: 14,
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 20px ${accentColor}55`,
              }}
              animate={{ boxShadow: `0 6px 24px ${accentColor}60` }}
              transition={{ duration: 0.5 }}
            >
              <CalendarRange size={18} color="white" strokeWidth={2} />
            </motion.div>
            <div>
              <h1 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 18, fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>
                Wall Calendar
              </h1>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3, lineHeight: 1 }}>
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.button
              id="mobile-notes-btn"
              className="wc-mobile-notes-btn"
              onClick={() => setShowMobileNotes(v => !v)}
              style={{
                alignItems: "center", gap: 6,
                fontSize: 12, fontWeight: 600, padding: "8px 14px",
                borderRadius: 12, border: `1px solid ${showMobileNotes ? accentColor + "55" : "var(--border)"}`,
                background: showMobileNotes ? accentColor + "18" : "var(--bg-glass)",
                color: showMobileNotes ? accentColor : "var(--text-secondary)",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={13} />
              Notes {monthNotes.length > 0 && `(${monthNotes.length})`}
            </motion.button>
            <ThemeToggle accentColor={accentColor} />
          </div>
        </div>

        <div style={{ position: "relative", marginTop: 45 }}>
          <div style={{
            position: "absolute", top: -42, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: "50%", background: "#475569",
              boxShadow: "0 4px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
              position: "relative", zIndex: 2
            }} />
            <div style={{
              width: 48, height: 35, border: "3.5px solid #94a3b8", borderRadius: "50% 50% 0 0",
              borderBottom: "none", marginTop: -6, zIndex: 1,
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))"
            }} />
          </div>

          <motion.div
            className="wc-card"
            style={{ boxShadow: `0 40px 100px ${accentColor}22, 0 12px 32px rgba(0,0,0,0.10)` }}
            animate={{ boxShadow: `0 40px 100px ${accentColor}22, 0 12px 32px rgba(0,0,0,0.10)` }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              height: 18, width: "100%",
              background: "linear-gradient(to bottom, #f1f5f9 0%, #cbd5e1 40%, #64748b 100%)",
              borderBottom: "1px solid rgba(0,0,0,0.3)",
              display: "flex", justifyContent: "space-evenly", alignItems: "center",
              padding: "0 10px"
            }}>
              {Array.from({length: 45}).map((_, i) => (
                <div key={i} style={{
                  width: 5, height: 10, background: "#0f172a", borderRadius: 2,
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)"
                }} />
              ))}
            </div>
          <div className="wc-inner">

            {/* ── LEFT: Hero Image ── */}
            <div className="wc-left">
              <HeroImage
                hero={hero}
                currentMonth={currentMonth}
                direction={direction}
                onColorsExtracted={handleColorsExtracted}
              />
            </div>

            <div className="wc-right">

              {/* Mobile hero (shows only on small screens) */}
              <div className="wc-mobile-hero">
                <HeroImage
                  hero={hero}
                  currentMonth={currentMonth}
                  direction={direction}
                  onColorsExtracted={handleColorsExtracted}
                />
              </div>

              {/* Calendar section */}
              <div className="wc-calendar-section">
                <CalendarHeader
                  currentMonth={currentMonth}
                  accentColor={accentColor}
                  onPrev={goToPrevMonth}
                  onNext={goToNextMonth}
                  onToday={goToToday}
                />

                <AnimatePresence mode="wait">
                  {selectionState === "idle" && showHint && (
                    <motion.div key="hint"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 12px", borderRadius: 12, marginBottom: 8,
                        background: `${accentColor}0a`,
                        border: `1px dashed ${accentColor}40`,
                      }}
                    >
                      <MousePointerClick size={11} color={accentColor} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                        Click a date to start · Click another to complete the range
                      </span>
                    </motion.div>
                  )}

                  {selectionState === "selecting" && (
                    <motion.div key="selecting"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 12px", borderRadius: 12, marginBottom: 8,
                        background: `${accentColor}18`,
                        border: `1px solid ${accentColor}50`,
                        color: accentColor,
                      }}
                    >
                      <motion.div
                        style={{ width: 6, height: 6, borderRadius: "50%", background: accentColor, flexShrink: 0 }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      />
                      <span style={{ fontSize: 11, fontWeight: 600 }}>
                        {range.start
                          ? `From ${format(range.start, "MMM d")} — now click the end date`
                          : "Click a start date"}
                      </span>
                    </motion.div>
                  )}

                  {selectionState === "selected" && (
                    <motion.div key="selected"
                      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "8px 12px", borderRadius: 12, marginBottom: 8,
                        background: `${accentColor}18`,
                        border: `1px solid ${accentColor}50`,
                        color: accentColor,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <CalendarRange size={11} />
                        <span style={{ fontSize: 11, fontWeight: 700 }}>
                          {formatDateRange(range.start, range.end)}
                        </span>
                      </div>
                      <button onClick={clearSelection}
                        style={{ width: 20, height: 20, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: accentColor }}
                        aria-label="Clear selection">
                        <X size={11} strokeWidth={2.5} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ flex: 1 }}>
                  <CalendarGrid
                    dayCells={dayCells}
                    currentMonth={currentMonth}
                    direction={direction}
                    accentColor={accentColor}
                    onDateClick={handleDateClick}
                  />
                </div>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
                  {[
                    { color: accentColor, label: "Selected", filled: true },
                    { color: "#f87171", label: "Weekend" },
                    { color: accentColor, label: "Today", border: true },
                    { color: "#f59e0b", label: "Holiday", dot: true },
                    { color: accentColor, label: "Has notes", dot: true },
                  ].map(item => <LegendItem key={item.label} {...item} />)}
                </div>
              </div>

              <div className="wc-divider" />

              <div className="wc-notes-section">
                <NotesPanel
                  notes={monthNotes}
                  currentMonth={currentMonth}
                  selectedRange={range}
                  accentColor={accentColor}
                  onAddNote={addNote}
                  onDeleteNote={deleteNote}
                />
              </div>
            </div>
          </div>
        </motion.div>
        </div>

        {/* Mobile notes panel */}
        <AnimatePresence>
          {showMobileNotes && (
            <motion.div className="wc-mobile-notes-panel"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              style={{ boxShadow: `0 20px 60px ${accentColor}18` }}
            >
              <NotesPanel
                notes={monthNotes}
                currentMonth={currentMonth}
                selectedRange={range}
                accentColor={accentColor}
                onAddNote={addNote}
                onDeleteNote={deleteNote}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="wc-footer">
          <Info size={12} style={{ color: "var(--text-muted)", opacity: 0.8 }} />
          <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>
            Notes persist in browser · Built with Next.js, Framer Motion & Tailwind CSS
          </p>
        </div>
      </div>
    </>
  );
}

function LegendItem({ color, label, filled, border, dot }: {
  color: string; label: string; filled?: boolean; border?: boolean; dot?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {dot ? (
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      ) : (
        <div style={{
          width: 13, height: 13, borderRadius: 4,
          background: filled ? color : "transparent",
          border: `1.5px solid ${border ? color : filled ? color : "#f87171"}`,
        }} />
      )}
      <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{label}</span>
    </div>
  );
}
