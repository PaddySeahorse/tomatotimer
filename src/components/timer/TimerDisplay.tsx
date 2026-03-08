import { formatTime } from '@/lib/utils';
import type { ThemeMode } from '@/lib/types';

interface TimerDisplayProps {
  size?: 'default' | 'fullscreen';
  color: string;
  timeLeft: number;
  totalTime: number;
  label: string;
  theme: ThemeMode;
}

const RADIUS = 140;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerDisplay({ size = 'default', color, timeLeft, totalTime, label, theme }: TimerDisplayProps) {
  const progress = ((totalTime - timeLeft) / totalTime) * CIRCUMFERENCE;
  const strokeDashoffset = CIRCUMFERENCE - progress;
  const isFullscreen = size === 'fullscreen';

  return (
    <div className="relative">
      <svg
        width={isFullscreen ? '500' : '320'}
        height={isFullscreen ? '500' : '320'}
        viewBox="0 0 320 320"
        className="-rotate-90 transform"
      >
        <circle
          cx="160"
          cy="160"
          r={RADIUS}
          fill="none"
          stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
          strokeWidth="12"
        />
        <circle
          cx="160"
          cy="160"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={isFullscreen ? `text-8xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}` : `text-6xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {formatTime(timeLeft)}
          </div>
          <div className={isFullscreen ? `mt-2 text-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}` : `mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
