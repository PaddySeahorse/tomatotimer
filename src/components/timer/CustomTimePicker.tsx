import type { ThemeMode } from '@/lib/types';

interface CustomTimePickerProps {
  customTime: number;
  theme: ThemeMode;
  onChange: (value: number) => void;
  onApply: () => void;
  onCancel: () => void;
}

export function CustomTimePicker({ customTime, theme, onChange, onApply, onCancel }: CustomTimePickerProps) {
  const progress = ((customTime - 15) / 105) * 100;

  return (
    <div className={`mt-4 rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="mb-3 flex items-center justify-between">
        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          自定义专注时长
        </label>
        <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {customTime} 分钟
        </span>
      </div>
      <input
        type="range"
        min="15"
        max="120"
        step="5"
        value={customTime}
        onChange={(event) => onChange(Number.parseInt(event.target.value, 10))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-rose-500"
        aria-label="自定义专注时长"
        title="自定义专注时长"
        style={{
          background:
            theme === 'dark'
              ? `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${progress}%, #4B5563 ${progress}%, #4B5563 100%)`
              : `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between">
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>15分钟</span>
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>120分钟</span>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={onApply}
          className="flex-1 rounded-lg bg-rose-500 px-6 py-2 font-medium text-white transition-colors hover:bg-rose-600"
        >
          应用
        </button>
        <button
          onClick={onCancel}
          className={`flex-1 rounded-lg px-6 py-2 font-medium transition-colors ${
            theme === 'dark' ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          取消
        </button>
      </div>
    </div>
  );
}
