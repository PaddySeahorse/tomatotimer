import { useCallback, useState } from 'react';

import type { Toast, ToastType } from '@/lib/types';

const TOAST_DURATION = 3000;

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, TOAST_DURATION);
  }, []);

  return {
    toasts,
    addToast,
  };
}
