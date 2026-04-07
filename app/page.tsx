"use client";

import dynamic from "next/dynamic";

const WallCalendar = dynamic(
  () => import("@/components/Calendar/WallCalendar"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen w-full pt-16 pb-10 px-4 md:px-8 flex flex-col items-center">
      <div className="bg-mesh" />
      <WallCalendar />
    </main>
  );
}
