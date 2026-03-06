'use client';

import type { Toast } from '@/lib/types';

interface ToastSystemProps {
  toasts: Toast[];
}

export default function ToastSystem({ toasts }: ToastSystemProps) {
  return (
    <div className="fixed top-8 right-8 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg border transition-all duration-300 transform ${
            toast.type === 'success'
              ? 'bg-green-100/90 border-green-200 text-green-800'
              : 'bg-blue-100/90 border-blue-200 text-blue-800'
          }`}
          style={{ animation: 'slideIn 0.3s ease-out' }}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <span className="text-2xl">✓</span>
            ) : (
              <span className="text-2xl">ℹ</span>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
