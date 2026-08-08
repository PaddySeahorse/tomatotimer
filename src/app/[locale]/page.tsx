'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Moon, Sun } from 'lucide-react';

import Background from '@/components/Background';
import { TaskSection } from '@/components/tasks/TaskSection';
import { CustomTimePicker } from '@/components/timer/CustomTimePicker';
import { FullscreenTimer } from '@/components/timer/FullscreenTimer';
import { TimerControls } from '@/components/timer/TimerControls';
import { TimerDisplay } from '@/components/timer/TimerDisplay';
import { ToastSystem } from '@/components/ui/ToastSystem';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTasks } from '@/hooks/useTasks';
import { useTimer } from '@/hooks/useTimer';
import { useToasts } from '@/hooks/useToasts';
import type { ThemeMode, TimerState } from '@/lib/types';

const TIMER_STATES: Array<{ key: TimerState }> = [
  { key: 'focus' },
  { key: 'shortBreak' },
  { key: 'longBreak' },
];

import { use } from 'react';

export default function Pomodoro({ params }: { params: Promise<{ locale: string }> }) {
  use(params);
  const [theme, setTheme] = useLocalStorage<ThemeMode>('pomodoro-theme', 'light');
  const { toasts, addToast } = useToasts();
  const tPage = useTranslations('Page');
  const tTimer = useTranslations('Timer');

  const timer = useTimer({
    onComplete: (label) => addToast(tTimer('completed', { label }), 'success'),
  });
  const tasks = useTasks();

  const handleApplyCustomTime = useCallback(() => {
    const result = timer.applyCustomTime();
    addToast(result.message, result.success ? 'success' : 'info');
  }, [addToast, timer]);

  return (
    <>
      <Background theme={theme} timerState={timer.state} />

      {timer.isFullscreen && (
        <FullscreenTimer
          color={timer.timerConfig[timer.state].color}
          label={timer.timerConfig[timer.state].label}
          timeLeft={timer.timeLeft}
          totalTime={timer.totalTime}
          isRunning={timer.isRunning}
          theme={theme}
          onToggle={timer.toggleTimer}
          onStop={timer.stopTimer}
        />
      )}

      {!timer.isFullscreen && (
        <div className="relative z-10 container mx-auto px-4 py-8">
          <header className="mb-8 flex items-center justify-between gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h1 className={`mb-2 text-3xl sm:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {tPage('title')}
              </h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{tPage('subtitle')}</p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`rounded-full p-3 transition-colors ${theme === 'dark' ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white/50 text-gray-700 hover:bg-white/80'}`}
                aria-label={tPage('themeToggle')}
                title={tPage('themeToggle')}
              >
                {theme === 'light' ? <Sun /> : <Moon />}
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-white/30 bg-white/70 p-4 sm:p-6 shadow-2xl backdrop-blur-lg">
              <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                {TIMER_STATES.map(({ key }) => (
                  <button
                    key={key}
                    onClick={() => timer.switchState(key)}
                    className={`rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 ${
                      timer.state === key ? 'scale-105 shadow-lg' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    style={{
                      backgroundColor: timer.state === key ? timer.timerConfig[key].color : 'transparent',
                      color: timer.state === key ? 'white' : theme === 'dark' ? '#9CA3AF' : '#666',
                    }}
                  >
                    {tTimer(key)}
                  </button>
                ))}
              </div>

              <div className="mb-6 flex justify-center">
                <TimerDisplay
                  color={timer.timerConfig[timer.state].color}
                  timeLeft={timer.timeLeft}
                  totalTime={timer.totalTime}
                  label={timer.timerConfig[timer.state].label}
                  theme={theme}
                />
              </div>

              <TimerControls
                isRunning={timer.isRunning}
                color={timer.timerConfig[timer.state].color}
                theme={theme}
                onToggle={timer.toggleTimer}
                onReset={timer.resetTimer}
              />

              {timer.showCustomTimeInput ? (
                <CustomTimePicker
                  customTime={timer.customTime}
                  theme={theme}
                  onChange={timer.setCustomTime}
                  onApply={handleApplyCustomTime}
                  onCancel={() => timer.setShowCustomTimeInput(false)}
                />
              ) : (
                <button
                  onClick={() => timer.setShowCustomTimeInput(true)}
                  className={`mt-3 w-full rounded-lg py-2 text-sm font-medium transition-colors ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tTimer('customTime')}
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <TaskSection
              theme={theme}
              tasks={tasks.tasks}
              editingId={tasks.editingId}
              isModalOpen={tasks.isModalOpen}
              taskDraft={tasks.taskDraft}
              onOpenModal={tasks.openModal}
              onCloseModal={tasks.closeModal}
              onUpdateDraft={tasks.updateDraft}
              onSubmitTask={tasks.submitTask}
              onMoveTask={tasks.moveTask}
              onDeleteTask={tasks.deleteTask}
            />
          </div>

          <ToastSystem toasts={toasts} />

          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
