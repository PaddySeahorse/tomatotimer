import { useCallback, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Task, TaskDraft, TaskStatus } from '@/lib/types';

const STORAGE_KEY = 'pomodoro-tasks';

const initialDraft: TaskDraft = {
  title: '',
  desc: '',
  priority: 'medium',
  status: 'todo',
  tag: 'general',
  due: '',
  assignee: '1',
};

const seedTasks: Task[] = [];

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, seedTasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDraft, setTaskDraft] = useState<TaskDraft>(initialDraft);

  const openModal = useCallback((status: TaskStatus = 'todo', taskId: string | null = null) => {
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      setEditingId(taskId);
      setTaskDraft({
        title: task.title,
        desc: task.desc ?? '',
        priority: task.priority,
        status: task.status,
        tag: task.tag,
        due: task.due ?? '',
        assignee: task.assignee,
      });
    } else {
      setEditingId(null);
      setTaskDraft({ ...initialDraft, status });
    }
    setIsModalOpen(true);
  }, [tasks]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingId(null);
    setTaskDraft(initialDraft);
  }, []);

  const updateDraft = useCallback((updates: Partial<TaskDraft>) => {
    setTaskDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const submitTask = useCallback(() => {
    if (!taskDraft.title.trim()) return false;

    if (editingId) {
      setTasks((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...taskDraft, title: taskDraft.title.trim(), desc: taskDraft.desc.trim() || undefined, due: taskDraft.due || undefined } : t)));
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskDraft.title.trim(),
        desc: taskDraft.desc.trim() || undefined,
        priority: taskDraft.priority,
        status: taskDraft.status,
        tag: taskDraft.tag,
        due: taskDraft.due || undefined,
        assignee: taskDraft.assignee,
        createdAt: Date.now(),
      };
      setTasks((prev) => [...prev, newTask]);
    }
    closeModal();
    return true;
  }, [closeModal, editingId, setTasks, taskDraft]);

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) closeModal();
  }, [closeModal, editingId, setTasks]);

  return {
    tasks,
    editingId,
    isModalOpen,
    taskDraft,
    openModal,
    closeModal,
    updateDraft,
    submitTask,
    moveTask,
    deleteTask,
  };
}
