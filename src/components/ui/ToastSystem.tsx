import type { Toast } from '@/lib/types';

interface ToastSystemProps {
  toasts: Toast[];
}

export function ToastSystem({ toasts }: ToastSystemProps) {
  return (
    <div className="fixed right-8 top-8 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`transform rounded-2xl border px-6 py-4 shadow-2xl backdrop-blur-lg transition-all duration-300 ${
            toast.type === 'success'
              ? 'border-green-200 bg-green-100/90 text-green-800'
              : 'border-blue-200 bg-blue-100/90 text-blue-800'
          }`}
          style={{ animation: 'slideIn 0.3s ease-out' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{toast.type === 'success' ? '✓' : 'ℹ'}</span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
