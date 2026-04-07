"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  accentColor: string;
}

export default function ThemeToggle({ accentColor }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("calendar-theme");
    const isDarkTheme = stored === "dark";
    setIsDark(isDarkTheme);
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("calendar-theme", next ? "dark" : "light");
  };

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggle}
      className="ripple-btn relative w-14 h-7 rounded-full border border-[var(--border)]
                 transition-all duration-400 flex items-center px-1"
      style={{
        background: isDark
          ? `${accentColor}30`
          : "rgba(255,255,255,0.4)",
        boxShadow: `0 0 0 2px ${accentColor}30`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        size={11}
        className="absolute left-1.5 text-amber-400 opacity-60"
        strokeWidth={2.5}
      />
      <Moon
        size={11}
        className="absolute right-1.5 text-blue-400 opacity-60"
        strokeWidth={2.5}
      />

      <motion.div
        className="relative z-10 w-5 h-5 rounded-full shadow-md flex items-center justify-center"
        style={{ background: accentColor }}
        animate={{ x: isDark ? "100%" : "0%", marginLeft: isDark ? "0px" : "0px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={10} color="white" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={10} color="white" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
