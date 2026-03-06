'use client';

import { PlayIcon, PauseIcon, RefreshIcon, StopIcon } from '@/components/icons';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onStop?: () => void;
  theme: 'light' | 'dark';
  timerColor: string;
  variant?: 'normal' | 'fullscreen';
}

export default function TimerControls({
  isRunning,
  onToggle,
  onReset,
  onStop,
  theme,
  timerColor,
  variant = 'normal',
}: TimerControlsProps) {
  const isFullscreen = variant === 'fullscreen';

  const buttonBaseStyles = isFullscreen
    ? 'px-12 py-6 rounded-full text-white font-semibold text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 flex items-center gap-3'
    : 'px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3';

  const secondaryButtonStyles = isFullscreen
    ? 'px-10 py-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-2xl transition-all duration-300 hover:bg-gray-300 active:scale-95 flex items-center gap-3'
    : `px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 ${
        theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`;

  return (
    <div className={`flex ${isFullscreen ? 'gap-6' : 'justify-center gap-4'}`}>
      <button
        onClick={onToggle}
        className={buttonBaseStyles}
        style={{ backgroundColor: timerColor }}
      >
        {isRunning ? (
          <>
            <PauseIcon />
            {isFullscreen ? '暂停' : '暂停'}
          </>
        ) : (
          <>
            <PlayIcon />
            {isFullscreen ? '开始' : '开始'}
          </>
        )}
      </button>

      {onStop && isFullscreen && (
        <button
          onClick={onStop}
          className={secondaryButtonStyles}
        >
          <StopIcon />
          终止
        </button>
      )}

      {!isFullscreen && (
        <button onClick={onReset} className={secondaryButtonStyles}>
          <RefreshIcon />
          重置
        </button>
      )}
    </div>
  );
}
