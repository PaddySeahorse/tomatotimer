import { useState, useCallback } from 'react';
import type { Task } from '@/lib/types';

interface UseTasksReturn {
  tasks: Task[];
  expandedTaskId: string | null;
  showTaskInput: boolean;
  newTaskText: string;
  newTaskNote: string;
  newTaskPlannedTime: number;
  setNewTaskText: (text: string) => void;
  setNewTaskNote: (note: string) => void;
  setNewTaskPlannedTime: (time: number) => void;
  setShowTaskInput: (show: boolean) => void;
  addTask: () => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskExpand: (id: string) => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskNote, setNewTaskNote] = useState('');
  const [newTaskPlannedTime, setNewTaskPlannedTime] = useState(25);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const addTask = useCallback(() => {
    if (!newTaskText.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      plannedTime: newTaskPlannedTime,
      note: newTaskNote,
    };
    setTasks(prev => [...prev, task]);
    setNewTaskText('');
    setNewTaskNote('');
    setNewTaskPlannedTime(25);
    setShowTaskInput(false);
  }, [newTaskText, newTaskNote, newTaskPlannedTime]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const toggleTaskExpand = useCallback((id: string) => {
    setExpandedTaskId(prev => (prev === id ? null : id));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  return {
    tasks,
    expandedTaskId,
    showTaskInput,
    newTaskText,
    newTaskNote,
    newTaskPlannedTime,
    setNewTaskText,
    setNewTaskNote,
    setNewTaskPlannedTime,
    setShowTaskInput,
    addTask,
    toggleTask,
    deleteTask,
    toggleTaskExpand,
  };
}
