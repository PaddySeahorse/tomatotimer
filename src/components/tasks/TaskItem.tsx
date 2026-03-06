'use client';

import type { Task } from '@/lib/types';
import { PlayIcon, AlarmIcon } from '@/components/icons';
import { ChevronDownIcon } from '@/components/icons';

interface TaskItemProps {
  task: Task;
  isExpanded: boolean;
  theme: 'light' | 'dark';
  onToggleExpand: () => void;
  onToggleComplete: () => void;
  onStart: () => void;
  onDelete: () => void;
}

export default function TaskItem({
  task,
  isExpanded,
  theme,
  onToggleExpand,
  onToggleComplete,
  onStart,
  onDelete,
}: TaskItemProps) {
  return (
    <div
      className={`rounded-2xl transition-all duration-200 overflow-hidden ${
        theme === 'dark'
          ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
          : 'bg-white/50 hover:bg-white/80 border border-gray-200'
      }`}
    >
      {/* Task name row (always visible) */}
      <div
        className={`flex items-center gap-3 p-4 cursor-pointer ${isExpanded ? 'pb-2' : ''}`}
        onClick={onToggleExpand}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : theme === 'dark'
                ? 'border-gray-500 hover:border-rose-400'
                : 'border-gray-300 hover:border-rose-400'
          }`}
        >
          {task.completed && '✓'}
        </button>
        <span
          className={`flex-1 ${
            task.completed
              ? 'text-gray-400 line-through'
              : theme === 'dark'
                ? 'text-gray-200'
                : 'text-gray-800'
          }`}
        >
          {task.text}
        </span>
        {/* Expand/collapse indicator */}
        <ChevronDownIcon />
      </div>
      
      {/* Expanded details */}
      {isExpanded && (
        <div className="px-4 pb-4 ml-9 border-t border-gray-200/50 dark:border-gray-600/50 pt-3">
          <div className="flex items-center gap-3">
            {task.plannedTime && (
              <span className={`text-xs flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <AlarmIcon />
                {task.plannedTime}分钟
              </span>
            )}
            {task.note && (
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {task.note}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            {!task.completed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStart();
                }}
                className="px-3 py-1 rounded-lg text-sm bg-rose-500 text-white hover:bg-rose-600 transition-colors flex items-center gap-1"
              >
                <PlayIcon />
                开始
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            >
              删除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
