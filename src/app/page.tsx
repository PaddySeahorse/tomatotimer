'use client';

import { useCallback, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

import Background from '@/components/Background';
import { TaskSection } from '@/components/tasks/TaskSection';
import { CustomTimePicker } from '@/components/timer/CustomTimePicker';
import { FullscreenTimer } from '@/components/timer/FullscreenTimer';
import { TimerControls } from '@/components/timer/TimerControls';
import { TimerDisplay } from '@/components/timer/TimerDisplay';
import { ToastSystem } from '@/components/ui/ToastSystem';
import { useTasks } from '@/hooks/useTasks';
import { useTimer } from '@/hooks/useTimer';
import { useToasts } from '@/hooks/useToasts';
import type { ThemeMode, TimerState } from '@/lib/types';

const TIMER_STATES: Array<{ key: TimerState; label: string }> = [
  { key: 'focus', label: '专注' },
  { key: 'shortBreak', label: '短休息' },
  { key: 'longBreak', label: '长休息' },
];

export default function Pomodoro() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const { toasts, addToast } = useToasts();
  const timer = useTimer({
    onComplete: (label) => addToast(`${label}结束！`, 'success'),
  });
  const tasks = useTasks();

  const handleApplyCustomTime = useCallback(() => {
    const result = timer.applyCustomTime();
    addToast(result.message, result.success ? 'success' : 'info');
  }, [addToast, timer]);

  const handleStartTask = useCallback(
    (task: { plannedTime?: number }) => {
      timer.startTaskTimer(task.plannedTime);
    },
    [timer]
  );

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
          <header className="mb-8 flex items-center justify-between">
            <div className="flex-1 text-center">
              <h1 className={`mb-2 text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                番茄钟
              </h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>专注当下，成就未来</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`rounded-full p-3 transition-colors ${theme === 'dark' ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white/50 text-gray-700 hover:bg-white/80'}`}
                aria-label="切换深浅色主题"
                title="切换深浅色主题"
              >
                {theme === 'light' ? <Sun /> : <Moon />}
              </button>
            </div>
          </header>

          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/30 bg-white/70 p-8 shadow-2xl backdrop-blur-lg">
              <div className="mb-8 flex justify-center gap-3">
                {TIMER_STATES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => timer.switchState(key)}
                    className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                      timer.state === key ? 'scale-105 shadow-lg' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    style={{
                      backgroundColor: timer.state === key ? timer.timerConfig[key].color : 'transparent',
                      color: timer.state === key ? 'white' : theme === 'dark' ? '#9CA3AF' : '#666',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mb-8 flex justify-center">
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
                  自定义时长
                </button>
              )}
            </div>

            <TaskSection
              theme={theme}
              tasks={tasks.tasks}
              expandedTaskId={tasks.expandedTaskId}
              showTaskInput={tasks.showTaskInput}
              taskDraft={tasks.taskDraft}
              onToggleTaskInput={tasks.toggleTaskInput}
              onUpdateTaskDraft={tasks.updateTaskDraft}
              onAddTask={tasks.addTask}
              onToggleTask={tasks.toggleTask}
              onToggleTaskExpand={tasks.toggleTaskExpand}
              onDeleteTask={tasks.deleteTask}
              onStartTask={handleStartTask}
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
