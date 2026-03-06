'use client';

import { useState } from 'react';
import Background from '@/components/Background';
import { useTimer } from '@/hooks/useTimer';
import { useTasks } from '@/hooks/useTasks';
import { useToasts } from '@/hooks/useToasts';
import { LightModeIcon, DarkModeIcon } from '@/components/icons';
import TimerDisplay from '@/components/timer/TimerDisplay';
import TimerControls from '@/components/timer/TimerControls';
import TimerStateSwitcher from '@/components/timer/TimerStateSwitcher';
import CustomTimePicker from '@/components/timer/CustomTimePicker';
import FullscreenTimer from '@/components/timer/FullscreenTimer';
import TaskSection from '@/components/tasks/TaskSection';
import ToastSystem from '@/components/ui/ToastSystem';
import type { Task, ThemeMode } from '@/lib/types';

export default function Pomodoro() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  const { addToast } = useToasts();

  const handleTimerComplete = (label: string) => {
    addToast(`${label}结束！`, 'success');
  };

  const {
    state,
    timeLeft,
    isRunning,
    totalTime,
    isFullscreen,
    customTime,
    timerConfig,
    circumference,
    strokeDashoffset,
    switchState,
    toggleTimer,
    resetTimer,
    applyCustomTime,
    startTaskTimer,
    setCustomTime,
    setShowCustomTimeInput,
    showCustomTimeInput,
  } = useTimer({
    onTimerComplete: handleTimerComplete,
  });

  const {
    tasks,
    expandedTaskId,
    showTaskInput,
    newTaskText,
    newTaskNote,
    newTaskPlannedTime,
    setNewTaskText,
    setNewTaskNote,
    setNewTaskPlannedTime,
    setShowTaskInput,
    addTask,
    toggleTask,
    deleteTask,
    toggleTaskExpand,
  } = useTasks();

  const handleStartTask = (task: Task) => {
    if (task.plannedTime) {
      startTaskTimer(task.plannedTime);
    } else {
      startTaskTimer();
    }
  };

  const handleApplyCustomTime = () => {
    if (customTime < 15 || customTime > 120) {
      addToast('时长必须在15-120分钟之间', 'info');
      return;
    }
    applyCustomTime(customTime);
    addToast(`专注时长已设置为${customTime}分钟`, 'success');
  };

  const handleStopFullscreen = () => {
    toggleTimer();
    setShowCustomTimeInput(false);
    resetTimer();
  };

  return (
    <>
      {/* Fixed background layer - always rendered */}
      <Background theme={theme} />

      {/* Fullscreen mode */}
      {isFullscreen && (
        <FullscreenTimer
          timeLeft={timeLeft}
          totalTime={totalTime}
          isRunning={isRunning}
          state={state}
          theme={theme}
          timerConfig={timerConfig}
          onToggle={toggleTimer}
          onStop={handleStopFullscreen}
          circumference={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      )}

      {/* Normal mode */}
      {!isFullscreen && (
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>番茄钟</h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>专注当下，成就未来</p>
            </div>
            
            {/* Top right: Function buttons */}
            <div className="flex gap-3">
              {/* Theme toggle button */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white/50 hover:bg-white/80 text-gray-700'}`}
              >
                {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
              </button>
            </div>
          </header>

          {/* Main content */}
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Left: Timer */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
              {/* State switcher */}
              <TimerStateSwitcher
                currentState={state}
                onSwitch={switchState}
                timerConfig={timerConfig}
                theme={theme}
                disabled={isFullscreen}
              />

              {/* SVG progress ring */}
              <div className="flex justify-center mb-8">
                <TimerDisplay
                  timeLeft={timeLeft}
                  totalTime={totalTime}
                  state={state}
                  theme={theme}
                  timerConfig={timerConfig}
                  size="normal"
                />
              </div>

              {/* Control buttons */}
              <TimerControls
                isRunning={isRunning}
                onToggle={toggleTimer}
                onReset={resetTimer}
                theme={theme}
                timerColor={timerConfig[state].color}
                variant="normal"
              />

              {/* Custom time picker */}
              {showCustomTimeInput && (
                <CustomTimePicker
                  customTime={customTime}
                  onTimeChange={setCustomTime}
                  onApply={handleApplyCustomTime}
                  onCancel={() => setShowCustomTimeInput(false)}
                  theme={theme}
                />
              )}

              {/* Custom time toggle button */}
              {!showCustomTimeInput && (
                <button
                  onClick={() => setShowCustomTimeInput(true)}
                  className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  自定义时长
                </button>
              )}
            </div>

            {/* Right: Task management */}
            <TaskSection
              tasks={tasks}
              expandedTaskId={expandedTaskId}
              showTaskInput={showTaskInput}
              newTaskText={newTaskText}
              newTaskNote={newTaskNote}
              newTaskPlannedTime={newTaskPlannedTime}
              theme={theme}
              disabled={isFullscreen}
              onToggleTaskInput={() => setShowTaskInput(!showTaskInput)}
              onNewTaskTextChange={setNewTaskText}
              onNewTaskNoteChange={setNewTaskNote}
              onNewTaskPlannedTimeChange={setNewTaskPlannedTime}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onToggleTaskExpand={toggleTaskExpand}
              onStartTask={handleStartTask}
            />
          </div>

          {/* Toast notification system */}
          <ToastSystem toasts={toasts} />

          {/* Custom animations */}
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
