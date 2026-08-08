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

const seedTasks: Task[] = [
  { id: '1', title: 'Design the new login page', desc: 'Complete the login UI, including mobile adaptation, dark mode and high-contrast mode.', priority: 'high', status: 'todo', tag: 'design', due: '2026-07-28', assignee: '2', createdAt: Date.now() },
  { id: '2', title: 'Write API documentation', desc: 'Document the RESTful API for the user management module, including auth and rate limiting.', priority: 'medium', status: 'todo', tag: 'dev', due: '2026-08-02', assignee: '1', createdAt: Date.now() },
  { id: '3', title: 'Competitor analysis report', desc: 'Research 3 competitors and output a comparison matrix with recommendations.', priority: 'medium', status: 'todo', tag: 'research', due: '2026-08-05', assignee: '3', createdAt: Date.now() },
  { id: '4', title: 'Build the frontend component library', desc: 'Set up Button, Input, Modal, Select base components with docs and Storybook.', priority: 'high', status: 'progress', tag: 'dev', due: '2026-07-30', assignee: '1', createdAt: Date.now() },
  { id: '5', title: 'User requirements review meeting', desc: 'Discuss Q3 priorities with the product team and confirm milestones.', priority: 'low', status: 'progress', tag: 'meeting', due: '2026-07-25', assignee: '4', createdAt: Date.now() },
  { id: '6', title: 'Database performance optimization', desc: 'Analyze slow query logs, add composite indexes, optimize JOINs. Target P99 < 50ms.', priority: 'high', status: 'progress', tag: 'dev', due: '2026-07-26', assignee: '5', createdAt: Date.now() },
  { id: '7', title: 'Fix login page style bug', desc: 'Safari shows input borders incorrectly; add -webkit-appearance fix.', priority: 'medium', status: 'done', tag: 'bug', due: '2026-07-22', assignee: '1', createdAt: Date.now() },
  { id: '8', title: 'Weekly project report', desc: 'Summarize this week\'s progress, risks and next week\'s plan for management.', priority: 'low', status: 'done', tag: 'general', due: '2026-07-21', assignee: '3', createdAt: Date.now() },
  { id: '9', title: 'Deploy CI/CD pipeline', desc: 'Configure GitHub Actions for auto testing, quality checks and production deploy.', priority: 'medium', status: 'done', tag: 'dev', due: '2026-07-20', assignee: '5', createdAt: Date.now() },
  { id: '10', title: 'Usability test', desc: 'Recruit 5 users for core-flow testing and collect pain points.', priority: 'high', status: 'todo', tag: 'research', due: '2026-08-08', assignee: '4', createdAt: Date.now() },
];

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
