import { useState, useCallback } from 'react';
import type { Toast } from '@/lib/types';

interface UseToastsReturn {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
}

export function useToasts(): UseToastsReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return {
    toasts,
    addToast,
  };
}
