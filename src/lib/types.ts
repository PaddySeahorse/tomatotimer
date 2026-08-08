export type TimerState = 'focus' | 'shortBreak' | 'longBreak';
export type ThemeMode = 'light' | 'dark';
export type ToastType = 'success' | 'info' | 'warn';

export type TaskStatus = 'todo' | 'progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskTag = 'design' | 'dev' | 'meeting' | 'research' | 'bug' | 'general';

export interface Task {
  id: string;
  title: string;
  desc?: string;
  priority: TaskPriority;
  status: TaskStatus;
  tag: TaskTag;
  due?: string;
  assignee: string;
  createdAt: number;
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

export interface TaskDraft {
  title: string;
  desc: string;
  priority: TaskPriority;
  status: TaskStatus;
  tag: TaskTag;
  due: string;
  assignee: string;
}
