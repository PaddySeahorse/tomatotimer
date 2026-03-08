import { AlarmClock, ChevronDown, Play } from 'lucide-react';

import type { Task, ThemeMode } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  isExpanded: boolean;
  theme: ThemeMode;
  onToggleExpand: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onStartTask: (task: Task) => void;
}

export function TaskItem({
  task,
  isExpanded,
  theme,
  onToggleExpand,
  onToggleComplete,
  onDelete,
  onStartTask,
}: TaskItemProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border transition-all duration-200',
        theme === 'dark' ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-700' : 'border-gray-200 bg-white/50 hover:bg-white/80'
      )}
    >
      <div
        className={cn('flex cursor-pointer items-center gap-3 p-4', isExpanded && 'pb-2')}
        onClick={() => onToggleExpand(task.id)}
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggleComplete(task.id);
          }}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors',
            task.completed
              ? 'border-green-500 bg-green-500 text-white'
              : theme === 'dark'
                ? 'border-gray-500 hover:border-rose-400'
                : 'border-gray-300 hover:border-rose-400'
          )}
        >
          {task.completed && '✓'}
        </button>
        <span
          className={cn(
            'flex-1',
            task.completed ? 'text-gray-400 line-through' : theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          )}
        >
          {task.text}
        </span>
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-200', isExpanded && 'rotate-180', theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}
        />
      </div>

      {isExpanded && (
        <div className="ml-9 border-t border-gray-200/50 px-4 pb-4 pt-3 dark:border-gray-600/50">
          <div className="flex items-center gap-3">
            {task.plannedTime && (
              <span className={`flex items-center gap-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <AlarmClock size={16} />
                {task.plannedTime}分钟
              </span>
            )}
            {task.note && (
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {task.note}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {!task.completed && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onStartTask(task);
                }}
                className="flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1 text-sm text-white transition-colors hover:bg-rose-600"
              >
                <Play size={16} />
                开始
              </button>
            )}
            <button
              onClick={(event) => {
                event.stopPropagation();
                onDelete(task.id);
              }}
              className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-200"
            >
              删除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
