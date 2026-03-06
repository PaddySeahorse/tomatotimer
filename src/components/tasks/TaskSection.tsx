'use client';

import type { Task } from '@/lib/types';
import { TaskIcon } from '@/components/icons';
import TaskItem from './TaskItem';

interface TaskSectionProps {
  tasks: Task[];
  expandedTaskId: string | null;
  showTaskInput: boolean;
  newTaskText: string;
  newTaskNote: string;
  newTaskPlannedTime: number;
  theme: 'light' | 'dark';
  disabled?: boolean;
  onToggleTaskInput: () => void;
  onNewTaskTextChange: (text: string) => void;
  onNewTaskNoteChange: (note: string) => void;
  onNewTaskPlannedTimeChange: (time: number) => void;
  onAddTask: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleTaskExpand: (id: string) => void;
  onStartTask: (task: Task) => void;
}

export default function TaskSection({
  tasks,
  expandedTaskId,
  showTaskInput,
  newTaskText,
  newTaskNote,
  newTaskPlannedTime,
  theme,
  disabled = false,
  onToggleTaskInput,
  onNewTaskTextChange,
  onNewTaskNoteChange,
  onNewTaskPlannedTimeChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onToggleTaskExpand,
  onStartTask,
}: TaskSectionProps) {
  return (
    <div className={`bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 ${disabled ? 'opacity-50 pointer-events-none' : ''} ${theme === 'dark' ? 'bg-gray-800/70 border-gray-700' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <TaskIcon />
          任务列表
        </h2>
        <button
          onClick={onToggleTaskInput}
          className="px-4 py-2 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
        >
          {showTaskInput ? '✕ 取消' : '+ 添加'}
        </button>
      </div>

      {/* Add task form */}
      {showTaskInput && (
        <div className={`mb-6 p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => onNewTaskTextChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAddTask()}
            placeholder="输入任务名称..."
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-600 text-white focus:border-rose-400'
                : 'bg-white border-gray-200 text-gray-800 focus:border-rose-300'
            }`}
          />
          <div className="mt-3">
            <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              规划时长（分钟）
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={newTaskPlannedTime}
              onChange={(e) => onNewTaskPlannedTimeChange(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-rose-500"
              style={{
                background: theme === 'dark'
                  ? `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${((newTaskPlannedTime - 15) / 105) * 100}%, #4B5563 ${((newTaskPlannedTime - 15) / 105) * 100}%, #4B5563 100%)`
                  : `linear-gradient(to right, #FF6B6B 0%, #FF6B6B ${((newTaskPlannedTime - 15) / 105) * 100}%, #E5E7EB ${((newTaskPlannedTime - 15) / 105) * 100}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>15分钟</span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{newTaskPlannedTime} 分钟</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>120分钟</span>
            </div>
          </div>
          <div className="mt-3">
            <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              备注（可选）
            </label>
            <textarea
              value={newTaskNote}
              onChange={(e) => onNewTaskNoteChange(e.target.value)}
              placeholder="添加任务备注..."
              rows={2}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-white focus:border-rose-400'
                  : 'bg-white border-gray-200 text-gray-800 focus:border-rose-300'
              }`}
            />
          </div>
          <button
            onClick={onAddTask}
            className="mt-3 w-full py-2 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
          >
            添加任务
          </button>
        </div>
      )}

      {/* Task list */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
            暂无任务，点击上方"添加"创建
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isExpanded={expandedTaskId === task.id}
              theme={theme}
              onToggleExpand={() => onToggleTaskExpand(task.id)}
              onToggleComplete={() => onToggleTask(task.id)}
              onStart={() => onStartTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
