"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { HeroImageConfig } from "@/lib/heroImages";
import { useColorExtract } from "@/hooks/useColorExtract";

interface HeroImageProps {
  hero: HeroImageConfig;
  currentMonth: Date;
  direction: 1 | -1;
  onColorsExtracted: (colors: { dominant: string; light: string; dark: string }) => void;
}

export default function HeroImage({
  hero,
  currentMonth,
  direction,
  onColorsExtracted,
}: HeroImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { extractColors } = useColorExtract(hero.dominantColor);

  const handleImageLoad = useCallback(() => {
    if (!imgRef.current) return;
    const extracted = extractColors(imgRef.current);
    if (extracted) onColorsExtracted(extracted as never);
    onColorsExtracted({
      dominant: hero.dominantColor,
      light: hero.dominantColor + "cc",
      dark: hero.dominantColor + "66",
    });
  }, [extractColors, hero.dominantColor, onColorsExtracted]);

  const monthKey = format(currentMonth, "yyyy-MM");
  const monthName = format(currentMonth, "MMMM");
  const year = format(currentMonth, "yyyy");

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl min-h-[220px] md:min-h-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={monthKey}
          className="absolute inset-0"
          initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            ref={imgRef}
            src={hero.url}
            alt={hero.alt}
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
            style={{ minHeight: "220px" }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 20%,
                rgba(0,0,0,0.2) 50%,
                rgba(0,0,0,0.75) 100%
              )`,
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background: `linear-gradient(135deg, ${hero.dominantColor}cc 0%, transparent 60%)`,
              mixBlendMode: "multiply",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex flex-col gap-2.5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                           text-white/90 text-xs font-bold uppercase tracking-[0.15em]
                           backdrop-blur-md border border-white/20 w-fit"
                style={{ background: `${hero.dominantColor}80` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {monthName} {year}
              </div>

              <h1
                className="text-white text-5xl md:text-6xl font-black leading-none tracking-tight drop-shadow-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {monthName}
              </h1>

              <p className="text-white/80 text-sm pt-1">{hero.alt}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900" />
    </div>
  );
}
