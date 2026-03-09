'use client';

import { useEffect, useRef } from 'react';

import type { ThemeMode, TimerState } from '@/lib/types';

interface BackgroundProps {
  theme: ThemeMode;
  timerState: TimerState;
}

export default function Background({ theme, timerState }: BackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 向 iframe 发送主题变化消息
    const sendMessage = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: 'theme-change', theme, timerState },
          '*'
        );
      }
    };

    // 初始化发送主题
    sendMessage();

    // 窗口大小变化时重新发送
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        sendMessage();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [theme, timerState]);

  return (
    <iframe
      ref={iframeRef}
      src="/assets/background.html"
      className="fixed inset-0 w-full h-full border-0 pointer-events-none"
      title="动态背景"
    />
  );
}
