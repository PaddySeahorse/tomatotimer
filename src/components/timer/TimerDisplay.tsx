'use client';

import { useMemo } from 'react';
import { formatTime } from '@/lib/utils';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  state: 'focus' | 'shortBreak' | 'longBreak';
  theme: 'light' | 'dark';
  timerConfig: {
    [key: string]: { color: string; label: string };
  };
  size?: 'normal' | 'large';
}

export default function TimerDisplay({
  timeLeft,
  totalTime,
  state,
  theme,
  timerConfig,
  size = 'normal',
}: TimerDisplayProps) {
  const circumference = 2 * Math.PI * 140;
  const progress = useMemo(() => ((totalTime - timeLeft) / totalTime) * circumference, [totalTime, timeLeft, circumference]);
  const strokeDashoffset = circumference - progress;

  const dimensions = size === 'large'
    ? { svg: 500, viewBox: '320', cx: '160', cy: '160', r: '140', strokeWidth: '12', text: 'text-8xl', subtext: 'text-2xl' }
    : { svg: 320, viewBox: '320', cx: '160', cy: '160', r: '140', strokeWidth: '12', text: 'text-6xl', subtext: 'text-base' };

  return (
    <div className="relative">
      <svg
        width={dimensions.svg}
        height={dimensions.svg}
        viewBox={`0 0 ${dimensions.viewBox} ${dimensions.viewBox}`}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={dimensions.cx}
          cy={dimensions.cy}
          r={dimensions.r}
          fill="none"
          stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
          strokeWidth={dimensions.strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={dimensions.cx}
          cy={dimensions.cy}
          r={dimensions.r}
          fill="none"
          stroke={timerConfig[state].color}
          strokeWidth={dimensions.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`font-bold ${dimensions.text} ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {formatTime(timeLeft)}
          </div>
          <div className={`mt-2 ${dimensions.subtext} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {timerConfig[state].label}
          </div>
        </div>
      </div>
    </div>
  );
}
