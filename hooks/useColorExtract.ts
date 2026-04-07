"use client";

import { useState, useCallback } from "react";

interface ExtractedColors {
  dominant: string;
  light: string;
  dark: string;
}

function componentToHex(c: number): string {
  return c.toString(16).padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function lightenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return rgbToHex(
    Math.min(255, r + amount),
    Math.min(255, g + amount),
    Math.min(255, b + amount)
  );
}

function darkenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return rgbToHex(
    Math.max(0, r - amount),
    Math.max(0, g - amount),
    Math.max(0, b - amount)
  );
}

export function useColorExtract(fallbackColor: string) {
  const [colors, setColors] = useState<ExtractedColors>({
    dominant: fallbackColor,
    light: lightenColor(fallbackColor, 60),
    dark: darkenColor(fallbackColor, 60),
  });

  const extractColors = useCallback(
    (imgElement: HTMLImageElement) => {
      try {
        const canvas = document.createElement("canvas");
        const size = 50; // Sample small for performance
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(imgElement, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size).data;

        const colorMap: Record<string, number> = {};
        for (let i = 0; i < imageData.length; i += 16) {
          const r = Math.round(imageData[i] / 32) * 32;
          const g = Math.round(imageData[i + 1] / 32) * 32;
          const b = Math.round(imageData[i + 2] / 32) * 32;
          const a = imageData[i + 3];

          if (a < 128) continue;
          const brightness = (r + g + b) / 3;
          if (brightness < 30 || brightness > 220) continue;

          const key = `${r},${g},${b}`;
          colorMap[key] = (colorMap[key] ?? 0) + 1;
        }

        const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
        if (sorted.length === 0) return undefined;

        const [rr, gg, bb] = sorted[0][0].split(",").map(Number);
        const dominant = rgbToHex(rr, gg, bb);

        const result = {
          dominant,
          light: lightenColor(dominant, 80),
          dark: darkenColor(dominant, 60),
        };
        setColors(result);
        return result;
      } catch {
        const fallback = {
          dominant: fallbackColor,
          light: lightenColor(fallbackColor, 60),
          dark: darkenColor(fallbackColor, 60),
        };
        setColors(fallback);
        return fallback;
      }
    },
    [fallbackColor]
  );

  return { colors, extractColors };
}
