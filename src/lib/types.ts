export type TimerState = 'focus' | 'shortBreak' | 'longBreak';
export type ThemeMode = 'light' | 'dark';

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
  type: 'success' | 'info';
}

export interface TimerConfig {
  time: number;
  color: string;
  label: string;
}

export interface TimerConfigMap {
  focus: TimerConfig;
  shortBreak: TimerConfig;
  longBreak: TimerConfig;
}
