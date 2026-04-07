"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

import { useColorExtract } from "@/hooks/useColorExtract";

export default function HeroImage({
  hero,
  currentMonth,
  direction,
  onColorsExtracted
}) {
  const imgRef = useRef(null);
  const { extractColors } = useColorExtract(hero.dominantColor);

  const handleImageLoad = useCallback(() => {
    if (!imgRef.current) return;
    const extracted = extractColors(imgRef.current);
    if (extracted) onColorsExtracted(extracted);
    onColorsExtracted({
      dominant: hero.dominantColor,
      light: hero.dominantColor + "cc",
      dark: hero.dominantColor + "66"
    });
  }, [extractColors, hero.dominantColor, onColorsExtracted]);

  const monthKey = format(currentMonth, "yyyy-MM");
  const monthName = format(currentMonth, "MMMM");
  const year = format(currentMonth, "yyyy");

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-2xl md:rounded-3xl bg-[var(--bg-glass)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={monthKey}
          className="flex flex-col h-full"
          initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
          
          {/* Image Container - Shorter height */}
          <div className="relative w-full h-[62%] overflow-hidden">
            <img
              ref={imgRef}
              src={hero.url}
              alt={hero.alt}
              onLoad={handleImageLoad}
              crossOrigin="anonymous"
              className="w-full h-full object-cover" />
            
            {/* Subtle bottom edge shadow for depth */}
            <div
              className="absolute bottom-0 left-0 right-0 h-12"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)"
              }} />
          </div>

          {/* Text Section - Moved below image */}
          <motion.div
            className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}>
            
            <div className="flex flex-col gap-3">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           text-white text-xs font-black uppercase tracking-[0.25em]
                           shadow-sm w-fit"
                style={{ background: `${hero.dominantColor}` }}>
                
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {monthName} {year}
              </div>

              <h1
                className="text-[var(--text-primary)] text-5xl md:text-7xl font-black leading-tight tracking-tighter"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: hero.dominantColor 
                }}>
                
                {monthName}
              </h1>

              <p className="text-[var(--text-muted)] text-sm font-bold leading-relaxed max-w-[95%]">
                {hero.alt}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-3xl bg-[var(--bg-glass)]" />
    </div>);

}