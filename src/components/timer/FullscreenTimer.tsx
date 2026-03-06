'use client';

import type { Task } from '@/lib/types';

interface FullscreenTimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  state: 'focus' | 'shortBreak' | 'longBreak';
  theme: 'light' | 'dark';
  timerConfig: {
    [key: string]: { color: string; label: string };
  };
  onToggle: () => void;
  onStop: () => void;
  circumference: number;
  strokeDashoffset: number;
}

export default function FullscreenTimer({
  timeLeft,
  isRunning,
  state,
  theme,
  timerConfig,
  onToggle,
  onStop,
  circumference,
  strokeDashoffset,
}: FullscreenTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center animate-fadeIn">
      <div className="relative z-20 flex flex-col items-center">
        {/* Enlarged SVG progress ring */}
        <div className="mb-8">
          <div className="relative">
            <svg
              width="500"
              height="500"
              viewBox="0 0 320 320"
              className="transform -rotate-90"
            >
              {/* Background ring */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                strokeWidth="12"
              />
              {/* Progress ring */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke={timerConfig[state].color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            {/* Time display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-8xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className={`mt-2 text-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {timerConfig[state].label}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex gap-6">
          <button
            onClick={onToggle}
            className="px-12 py-6 rounded-full text-white font-semibold text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 flex items-center gap-3"
            style={{ backgroundColor: timerConfig[state].color }}
          >
            {isRunning ? (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M11 17 11 7H8V17H11ZM16 17 16 7H13L13 17H16Z" fill="currentColor"/>
                  </g>
                </svg>
                暂停
              </>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_543_8119)">
                    <path d="M2 3.5L21.5 12L2 20.5L5 12L2 3.5Z" fill="transparent"/>
                    <path d="M5 12L2 20.5L21.5 12L2 3.5L5 12ZM5 12H10" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_543_8119">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                开始
              </>
            )}
          </button>
          <button
            onClick={onStop}
            className="px-10 py-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-2xl transition-all duration-300 hover:bg-gray-300 active:scale-95 flex items-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="currentColor"/>
                <path d="M8 8H16V16H8V8Z" fill="currentColor"/>
              </g>
            </svg>
            终止
          </button>
        </div>

        {/* ESC hint */}
        <div className={`mt-8 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          按 ESC 键退出全屏
        </div>
      </div>
    </div>
  );
}
