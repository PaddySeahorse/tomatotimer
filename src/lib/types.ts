export type TimerState = 'focus' | 'shortBreak' | 'longBreak';
export type ThemeMode = 'light' | 'dark';
export type ToastType = 'success' | 'info';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  plannedTime?: number;
  note?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface TimerConfig {
  time: number;
  color: string;
  label: string;
}
