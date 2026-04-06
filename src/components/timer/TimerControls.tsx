import { Pause, Play, RotateCw, Square } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import type { ThemeMode } from '@/lib/types';

interface TimerControlsProps {
  isRunning: boolean;
  color: string;
  theme: ThemeMode;
  onToggle: () => void;
  onReset?: () => void;
  onStop?: () => void;
  fullscreen?: boolean;
}

export function TimerControls({
  isRunning,
  color,
  theme,
  onToggle,
  onReset,
  onStop,
  fullscreen = false,
}: TimerControlsProps) {
  const t = useTranslations('Timer');
  return (
    <div className={cn('flex justify-center gap-4', fullscreen && 'gap-6')}>
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-3 rounded-full text-white font-semibold transition-all duration-300 active:scale-95',
          fullscreen
            ? 'px-12 py-6 text-2xl shadow-2xl hover:scale-105'
            : 'px-10 py-4 text-lg shadow-lg hover:scale-105 hover:shadow-xl'
        )}
        style={{ backgroundColor: color }}
      >
        {isRunning ? <><Pause /> {t('pause')}</> : <><Play /> {t('start')}</>}
      </button>
      {fullscreen && onStop ? (
        <button
          onClick={onStop}
          className="flex items-center gap-3 rounded-full bg-gray-200 px-10 py-6 text-2xl font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-300 active:scale-95"
        >
          <Square />
          {t('stop')}
        </button>
      ) : onReset ? (
        <button
          onClick={onReset}
          className={cn(
            'flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95',
            theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          )}
        >
          <RotateCw />
          {t('reset', { fallback: 'Reset' })}
        </button>
      ) : null}
    </div>
  );
}
