import { useCallback, useState } from 'react';

import type { Task } from '@/lib/types';

interface TaskDraft {
  text: string;
  note: string;
  plannedTime: number;
}

const initialDraft: TaskDraft = {
  text: '',
  note: '',
  plannedTime: 25,
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [taskDraft, setTaskDraft] = useState<TaskDraft>(initialDraft);

  const updateTaskDraft = useCallback((updates: Partial<TaskDraft>) => {
    setTaskDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetTaskDraft = useCallback(() => {
    setTaskDraft(initialDraft);
  }, []);

  const toggleTaskInput = useCallback(() => {
    setShowTaskInput((prev) => {
      const next = !prev;
      if (!next) {
        setTaskDraft(initialDraft);
      }
      return next;
    });
  }, []);

  const closeTaskInput = useCallback(() => {
    setShowTaskInput(false);
    setTaskDraft(initialDraft);
  }, []);

  const addTask = useCallback(() => {
    if (!taskDraft.text.trim()) {
      return false;
    }

    const task: Task = {
      id: Date.now().toString(),
      text: taskDraft.text.trim(),
      completed: false,
      plannedTime: taskDraft.plannedTime,
      note: taskDraft.note.trim() || undefined,
    };

    setTasks((prev) => [...prev, task]);
    closeTaskInput();
    return true;
  }, [closeTaskInput, taskDraft]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }, []);

  const toggleTaskExpand = useCallback((id: string) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setExpandedTaskId((prev) => (prev === id ? null : prev));
  }, []);

  return {
    tasks,
    expandedTaskId,
    showTaskInput,
    taskDraft,
    updateTaskDraft,
    resetTaskDraft,
    toggleTaskInput,
    closeTaskInput,
    addTask,
    toggleTask,
    toggleTaskExpand,
    deleteTask,
  };
}
