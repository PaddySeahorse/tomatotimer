'use client';

import type { TimerState } from '@/lib/types';

interface TimerStateSwitcherProps {
  currentState: TimerState;
  onSwitch: (state: TimerState) => void;
  timerConfig: {
    [key: string]: { color: string };
  };
  theme: 'light' | 'dark';
  disabled?: boolean;
}

export default function TimerStateSwitcher({
  currentState,
  onSwitch,
  timerConfig,
  theme,
  disabled = false,
}: TimerStateSwitcherProps) {
  const states = [
    { key: 'focus' as TimerState, label: '专注' },
    { key: 'shortBreak' as TimerState, label: '短休息' },
    { key: 'longBreak' as TimerState, label: '长休息' },
  ];

  return (
    <div className={`flex justify-center gap-3 mb-8 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {states.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSwitch(key)}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            currentState === key
              ? 'shadow-lg scale-105'
              : 'bg-white/50 hover:bg-white/80'
          }`}
          style={{
            backgroundColor: currentState === key ? timerConfig[key].color : 'transparent',
            color: currentState === key ? 'white' : theme === 'dark' ? '#9CA3AF' : '#666',
          }}
          disabled={disabled}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
