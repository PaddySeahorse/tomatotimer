import { ListTodo } from 'lucide-react';

import { TaskItem } from '@/components/tasks/TaskItem';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Task, ThemeMode } from '@/lib/types';

interface TaskSectionProps {
  theme: ThemeMode;
  tasks: Task[];
  expandedTaskId: string | null;
  showTaskInput: boolean;
  taskDraft: {
    text: string;
    note: string;
    plannedTime: number;
  };
  onToggleTaskInput: () => void;
  onUpdateTaskDraft: (updates: Partial<{ text: string; note: string; plannedTime: number }>) => void;
  onAddTask: () => void;
  onToggleTask: (id: string) => void;
  onToggleTaskExpand: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onStartTask: (task: Task) => void;
}

export function TaskSection({
  theme,
  tasks,
  expandedTaskId,
  showTaskInput,
  taskDraft,
  onToggleTaskInput,
  onUpdateTaskDraft,
  onAddTask,
  onToggleTask,
  onToggleTaskExpand,
  onDeleteTask,
  onStartTask,
}: TaskSectionProps) {
  const sliderProgress = ((taskDraft.plannedTime - 15) / 105) * 100;

  return (
    <div className={`rounded-3xl border border-white/30 bg-white/70 p-8 shadow-2xl backdrop-blur-lg ${theme === 'dark' ? 'border-gray-700 bg-gray-800/70' : ''}`}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className={`flex items-center gap-2 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <ListTodo />
          任务列表
        </h2>
        <button
          onClick={onToggleTaskInput}
          className="rounded-full bg-rose-500 px-4 py-2 font-medium text-white transition-colors hover:bg-rose-600"
        >
          {showTaskInput ? '✕ 取消' : '+ 添加'}
        </button>
      </div>

      {showTaskInput && (
        <div className={`mb-6 rounded-2xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <Input
            type="text"
            value={taskDraft.text}
            onChange={(event) => onUpdateTaskDraft({ text: event.target.value })}
            onKeyDown={(event) => event.key === 'Enter' && onAddTask()}
            placeholder="输入任务名称..."
            className={theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white focus-visible:border-rose-400' : 'border-gray-200 bg-white text-gray-800 focus-visible:border-rose-300'}
          />
          <div className="mt-3">
            <label className={`mb-2 block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              规划时长（分钟）
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={taskDraft.plannedTime}
              onChange={(event) => onUpdateTaskDraft({ plannedTime: Number.parseInt(event.target.value, 10) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-rose-500"
              style={{
                background:
                  theme === 'dark'
                    ? `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${sliderProgress}%, #4B5563 ${sliderProgress}%, #4B5563 100%)`
                    : `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${sliderProgress}%, #E5E7EB ${sliderProgress}%, #E5E7EB 100%)`,
              }}
            />
            <div className="mt-1 flex justify-between">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>15分钟</span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {taskDraft.plannedTime} 分钟
              </span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>120分钟</span>
            </div>
          </div>
          <div className="mt-3">
            <label className={`mb-2 block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              备注（可选）
            </label>
            <Textarea
              value={taskDraft.note}
              onChange={(event) => onUpdateTaskDraft({ note: event.target.value })}
              placeholder="添加任务备注..."
              rows={2}
              className={theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white focus-visible:border-rose-400 resize-none' : 'border-gray-200 bg-white text-gray-800 focus-visible:border-rose-300 resize-none'}
            />
          </div>
          <button
            onClick={onAddTask}
            className="mt-3 w-full rounded-xl bg-rose-500 py-2 font-medium text-white transition-colors hover:bg-rose-600"
          >
            添加任务
          </button>
        </div>
      )}

      <div className="max-h-96 space-y-3 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="py-8 text-center text-gray-400">暂无任务，点击上方&quot;添加&quot;创建</div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isExpanded={expandedTaskId === task.id}
              theme={theme}
              onToggleExpand={onToggleTaskExpand}
              onToggleComplete={onToggleTask}
              onDelete={onDeleteTask}
              onStartTask={onStartTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
