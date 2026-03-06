'use client';

interface CustomTimePickerProps {
  customTime: number;
  onTimeChange: (time: number) => void;
  onApply: () => void;
  onCancel: () => void;
  theme: 'light' | 'dark';
}

export default function CustomTimePicker({
  customTime,
  onTimeChange,
  onApply,
  onCancel,
  theme,
}: CustomTimePickerProps) {
  return (
    <div className={`mt-4 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex justify-between items-center mb-3">
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
        onChange={(e) => onTimeChange(parseInt(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-rose-500"
        style={{
          background: theme === 'dark'
            ? `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${((customTime - 15) / 105) * 100}%, #4B5563 ${((customTime - 15) / 105) * 100}%, #4B5563 100%)`
            : `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${((customTime - 15) / 105) * 100}%, #E5E7EB ${((customTime - 15) / 105) * 100}%, #E5E7EB 100%)`
        }}
      />
      <div className="flex justify-between mt-2">
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>15分钟</span>
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>120分钟</span>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onApply}
          className="flex-1 px-6 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
        >
          应用
        </button>
        <button
          onClick={onCancel}
          className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
            theme === 'dark' ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          取消
        </button>
      </div>
    </div>
  );
}
