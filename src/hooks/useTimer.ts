import { useCallback, useEffect, useMemo, useState } from 'react';

import type { TimerConfig, TimerState } from '@/lib/types';

const FOCUS_MINUTES_MIN = 15;
const FOCUS_MINUTES_MAX = 120;

import { useTranslations } from 'next-intl';

function getTimerConfig(customTime: number, t: (key: string, values?: Record<string, string | number>) => string): Record<TimerState, TimerConfig> {
  return {
    focus: { time: customTime * 60, color: '#FF6B6B', label: t('timeLabel') },
    shortBreak: { time: 5 * 60, color: '#4ECDC4', label: t('shortBreak') },
    longBreak: { time: 15 * 60, color: '#6C5CE7', label: t('longBreak') },
  };
}

interface UseTimerOptions {
  onComplete?: (label: string) => void;
}

export function useTimer({ onComplete }: UseTimerOptions = {}) {
  const [state, setState] = useState<TimerState>('focus');
  const [customTime, setCustomTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);
  const t = useTranslations('Timer');

  const timerConfig = useMemo(() => getTimerConfig(customTime, t), [customTime, t]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete?.(timerConfig[state].label);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, onComplete, state, timeLeft, timerConfig]);

  useEffect(() => {
    if (isRunning && state === 'focus' && !isFullscreen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFullscreen(true);
    }

    if ((!isRunning || timeLeft === 0) && isFullscreen) {
      const timeout = window.setTimeout(() => setIsFullscreen(false), 500);
      return () => window.clearTimeout(timeout);
    }
  }, [isFullscreen, isRunning, state, timeLeft]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setIsRunning(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  const syncTimer = useCallback((nextState: TimerState, minutes?: number) => {
    const config = getTimerConfig(minutes ?? customTime, t);
    setState(nextState);
    setIsRunning(false);
    setTotalTime(config[nextState].time);
    setTimeLeft(config[nextState].time);
  }, [customTime, t]);

  const switchState = useCallback((nextState: TimerState) => {
    syncTimer(nextState);
  }, [syncTimer]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  }, [totalTime]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsFullscreen(false);
    setTimeLeft(totalTime);
  }, [totalTime]);

  const applyCustomTime = useCallback(() => {
    if (customTime < FOCUS_MINUTES_MIN || customTime > FOCUS_MINUTES_MAX) {
      return { success: false as const, message: t('durationValidation') };
    }

    setTotalTime(customTime * 60);
    setTimeLeft(customTime * 60);
    setShowCustomTimeInput(false);

    return {
      success: true as const,
      message: t('durationSet', { customTime }),
    };
  }, [customTime, t]);

  const startTaskTimer = useCallback((minutes?: number) => {
    const nextMinutes = minutes ?? customTime;
    if (minutes) {
      setCustomTime(minutes);
    }
    syncTimer('focus', nextMinutes);
    setTimeLeft(nextMinutes * 60);
    setTotalTime(nextMinutes * 60);
    setIsRunning(true);
  }, [customTime, syncTimer]);

  return {
    state,
    timeLeft,
    totalTime,
    isRunning,
    isFullscreen,
    customTime,
    showCustomTimeInput,
    timerConfig,
    setCustomTime,
    setShowCustomTimeInput,
    switchState,
    toggleTimer,
    resetTimer,
    stopTimer,
    applyCustomTime,
    startTaskTimer,
  };
}
