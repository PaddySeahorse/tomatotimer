import { useState, useEffect, useCallback, useMemo } from 'react';
import type { TimerState, TimerConfigMap } from '@/lib/types';

interface UseTimerOptions {
  onTimerComplete?: (label: string) => void;
}

interface UseTimerReturn {
  state: TimerState;
  timeLeft: number;
  isRunning: boolean;
  totalTime: number;
  isFullscreen: boolean;
  customTime: number;
  timerConfig: TimerConfigMap;
  progress: number;
  strokeDashoffset: number;
  circumference: number;
  switchState: (newState: TimerState) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  applyCustomTime: (minutes: number) => void;
  startTaskTimer: (minutes?: number) => void;
  setCustomTime: (minutes: number) => void;
  setShowCustomTimeInput: (show: boolean) => void;
  showCustomTimeInput: boolean;
}

export function useTimer({ onTimerComplete }: UseTimerOptions): UseTimerReturn {
  const [state, setState] = useState<TimerState>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [customTime, setCustomTime] = useState(25);
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);

  const timerConfig = useMemo<TimerConfigMap>(() => ({
    focus: { time: customTime * 60, color: '#FF6B6B', label: '专注时间' },
    shortBreak: { time: 5 * 60, color: '#4ECDC4', label: '短休息' },
    longBreak: { time: 15 * 60, color: '#6C5CE7', label: '长休息' },
  }), [customTime]);

  const circumference = 2 * Math.PI * 140;
  const progress = useMemo(() => ((totalTime - timeLeft) / totalTime) * circumference, [totalTime, timeLeft, circumference]);
  const strokeDashoffset = circumference - progress;

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimerComplete?.(timerConfig[state].label);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, state, timerConfig, onTimerComplete]);

  // Fullscreen mode logic
  useEffect(() => {
    // Enter fullscreen when focus mode starts
    if (isRunning && state === 'focus' && !isFullscreen) {
      setIsFullscreen(true);
    }

    // Exit fullscreen when timer stops or completes
    if ((!isRunning || timeLeft === 0) && isFullscreen) {
      const timer = setTimeout(() => setIsFullscreen(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isRunning, state, timeLeft, isFullscreen]);

  // ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setIsRunning(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  const switchState = useCallback((newState: TimerState) => {
    setState(newState);
    setIsRunning(false);
    setTotalTime(timerConfig[newState].time);
    setTimeLeft(timerConfig[newState].time);
  }, [timerConfig]);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  }, [totalTime]);

  const applyCustomTime = useCallback((minutes: number) => {
    if (minutes < 15 || minutes > 120) {
      return;
    }
    const newTime = minutes * 60;
    setTotalTime(newTime);
    setTimeLeft(newTime);
    setCustomTime(minutes);
    setShowCustomTimeInput(false);
  }, []);

  const startTaskTimer = useCallback((minutes?: number) => {
    const taskTime = minutes || customTime;
    setTotalTime(taskTime * 60);
    setTimeLeft(taskTime * 60);
    setCustomTime(taskTime);
    setState('focus');
    setIsRunning(true);
  }, [customTime]);

  return {
    state,
    timeLeft,
    isRunning,
    totalTime,
    isFullscreen,
    customTime,
    timerConfig,
    progress,
    strokeDashoffset,
    circumference,
    switchState,
    toggleTimer,
    resetTimer,
    applyCustomTime,
    startTaskTimer,
    setCustomTime,
    setShowCustomTimeInput,
    showCustomTimeInput,
  };
}
