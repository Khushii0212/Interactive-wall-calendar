import React from 'react';
import WallCalendar from '@/components/Calendar/WallCalendar';

export default function App() {
  return (
    <main className="min-h-screen w-full pt-16 pb-10 px-4 md:px-8 flex flex-col items-center">
      <div className="bg-mesh" />
      <WallCalendar />
    </main>
  );
}
