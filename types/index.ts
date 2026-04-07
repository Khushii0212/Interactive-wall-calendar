export interface CalendarNote {
  id: string;
  text: string;
  createdAt: string;
  targetMonth?: string;
  dateRange?: {
    start: string; 
    end: string;   
  };
  color?: string;
}

export interface Holiday {
  date: string; // "MM-DD" format
  name: string;
  color: string;
  emoji?: string;
}

export interface MonthHeroImage {
  url: string;
  alt: string;
  credit?: string;
  dominantColor?: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type SelectionState = 'idle' | 'selecting' | 'selected';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
}

export interface DayCellData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  hasNotes: boolean;
  holidays: Holiday[];
}
