export interface HeroImageConfig {
  url: string;
  alt: string;
  dominantColor: string; 
  gradient: string;
}

export const MONTHLY_HEROES: Record<number, HeroImageConfig> = {
  0: {
    // January — Snow landscape
    url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80",
    alt: "Snowy winter mountain landscape",
    dominantColor: "#4a90d9",
    gradient: "from-blue-900 via-blue-700 to-blue-500",
  },
  1: {
    // February — Cherry blossoms / love
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    alt: "Cherry blossom trees in bloom",
    dominantColor: "#e91e8c",
    gradient: "from-pink-900 via-pink-700 to-rose-500",
  },
  2: {
    // March — Spring flowers
    url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
    alt: "Spring wildflowers field",
    dominantColor: "#4caf50",
    gradient: "from-green-900 via-green-700 to-emerald-500",
  },
  3: {
    // April — Rain and renewal
    url: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80",
    alt: "Rainy forest path in spring",
    dominantColor: "#00bcd4",
    gradient: "from-teal-900 via-teal-700 to-cyan-500",
  },
  4: {
    // May — Golden fields
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    alt: "Golden summer mountain vista",
    dominantColor: "#ff9800",
    gradient: "from-amber-900 via-amber-700 to-yellow-500",
  },
  5: {
    // June — Ocean sunset
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Tropical beach sunset",
    dominantColor: "#ff5722",
    gradient: "from-orange-900 via-orange-700 to-amber-500",
  },
  6: {
    // July — Fireworks / celebration
    url: "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=800&q=80",
    alt: "Colorful fireworks over city",
    dominantColor: "#9c27b0",
    gradient: "from-purple-900 via-purple-700 to-violet-500",
  },
  7: {
    // August — River canyon
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    alt: "Stunning canyon with river",
    dominantColor: "#e65100",
    gradient: "from-red-900 via-orange-800 to-amber-600",
  },
  8: {
    // September — Autumn leaves
    url: "https://images.unsplash.com/photo-1478144592103-25e218a04891?w=800&q=80",
    alt: "Vibrant autumn forest colors",
    dominantColor: "#d84315",
    gradient: "from-red-900 via-red-700 to-orange-600",
  },
  9: {
    // October — Pumpkins / Halloween
    url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
    alt: "Misty autumn forest path",
    dominantColor: "#bf360c",
    gradient: "from-orange-900 via-orange-800 to-red-700",
  },
  10: {
    // November — Foggy forest
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    alt: "Foggy pine forest in November",
    dominantColor: "#546e7a",
    gradient: "from-slate-900 via-slate-700 to-gray-600",
  },
  11: {
    // December — Snow and Christmas
    url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    alt: "Snow covered pine trees at Christmas",
    dominantColor: "#1565c0",
    gradient: "from-blue-950 via-blue-900 to-indigo-800",
  },
};

export function getHeroForMonth(month: number): HeroImageConfig {
  return MONTHLY_HEROES[month] ?? MONTHLY_HEROES[0];
}
