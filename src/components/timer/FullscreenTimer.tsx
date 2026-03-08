import { TimerControls } from '@/components/timer/TimerControls';
import { TimerDisplay } from '@/components/timer/TimerDisplay';
import type { ThemeMode } from '@/lib/types';

interface FullscreenTimerProps {
  color: string;
  label: string;
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  theme: ThemeMode;
  onToggle: () => void;
  onStop: () => void;
}

export function FullscreenTimer({
  color,
  label,
  timeLeft,
  totalTime,
  isRunning,
  theme,
  onToggle,
  onStop,
}: FullscreenTimerProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center animate-fadeIn">
      <div className="relative z-20 flex flex-col items-center">
        <div className="mb-8">
          <TimerDisplay
            size="fullscreen"
            color={color}
            timeLeft={timeLeft}
            totalTime={totalTime}
            label={label}
            theme={theme}
          />
        </div>
        <TimerControls
          fullscreen
          isRunning={isRunning}
          color={color}
          theme={theme}
          onToggle={onToggle}
          onStop={onStop}
        />
        <div className={`mt-8 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          按 ESC 键退出全屏
        </div>
      </div>
    </div>
  );
}
