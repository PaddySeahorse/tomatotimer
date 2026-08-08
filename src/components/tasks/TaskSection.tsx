'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Plus, Trash2, X } from 'lucide-react';

import type { Task, TaskDraft, TaskPriority, TaskStatus, TaskTag, ThemeMode } from '@/lib/types';
import { useToasts } from '@/hooks/useToasts';
import { cn } from '@/lib/utils';

interface TaskSectionProps {
  theme: ThemeMode;
  tasks: Task[];
  editingId: string | null;
  isModalOpen: boolean;
  taskDraft: TaskDraft;
  onOpenModal: (status: TaskStatus, taskId?: string) => void;
  onCloseModal: () => void;
  onUpdateDraft: (updates: Partial<TaskDraft>) => void;
  onSubmitTask: () => boolean;
  onMoveTask: (id: string, status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
}

const STATUSES: TaskStatus[] = ['todo', 'progress', 'done'];
const PRIORITIES: TaskPriority[] = ['high', 'medium', 'low'];
const TAGS: (TaskTag | 'general')[] = ['general', 'design', 'dev', 'meeting', 'research', 'bug'];

const ASSIGNEES: Record<string, { name: string; short: string; cls: string }> = {
  '1': { name: 'Zhang Ming', short: 'ZM', cls: 'avatar-1' },
  '2': { name: 'Li Na', short: 'LN', cls: 'avatar-2' },
  '3': { name: 'Wang Hao', short: 'WH', cls: 'avatar-3' },
  '4': { name: 'Zhao Xue', short: 'ZX', cls: 'avatar-4' },
  '5': { name: 'Liu Yang', short: 'LY', cls: 'avatar-5' },
};

const COLUMN_THEME: Record<TaskStatus, { icon: string; iconWrap: string }> = {
  todo: { icon: '📌', iconWrap: 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-700' },
  progress: { icon: '⚡', iconWrap: 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700' },
  done: { icon: '✅', iconWrap: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700' },
};

const PRIORITY_BADGE: Record<TaskPriority, string> = {
  high: 'bg-red-50 text-red-600 border border-red-200',
  medium: 'bg-amber-50 text-amber-600 border border-amber-200',
  low: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
};

const TAG_BADGE: Record<TaskTag, string> = {
  design: 'bg-pink-50 text-pink-600',
  dev: 'bg-blue-50 text-blue-600',
  meeting: 'bg-violet-50 text-violet-600',
  research: 'bg-cyan-50 text-cyan-600',
  bug: 'bg-red-50 text-red-600',
  general: 'bg-violet-50 text-violet-600',
};

const AVATAR_GRADIENT: Record<string, string> = {
  'avatar-1': 'bg-gradient-to-br from-violet-500 to-violet-400',
  'avatar-2': 'bg-gradient-to-br from-pink-500 to-pink-400',
  'avatar-3': 'bg-gradient-to-br from-emerald-500 to-emerald-400',
  'avatar-4': 'bg-gradient-to-br from-orange-500 to-orange-400',
  'avatar-5': 'bg-gradient-to-br from-blue-500 to-blue-400',
};

export function TaskSection({
  theme,
  tasks,
  editingId,
  isModalOpen,
  taskDraft,
  onOpenModal,
  onCloseModal,
  onUpdateDraft,
  onSubmitTask,
  onMoveTask,
  onDeleteTask,
}: TaskSectionProps) {
  const t = useTranslations('Tasks');
  const { addToast } = useToasts();
  const [filter, setFilter] = useState<'all' | TaskPriority>('all');
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<TaskStatus | null>(null);
  const [activeCol, setActiveCol] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const onBoardScroll = useCallback(() => {
    const el = boardRef.current;
    if (!el) return;
    const colWidth = el.querySelector('[data-col]')?.getBoundingClientRect().width ?? 1;
    const gap = 16;
    const idx = Math.round(el.scrollLeft / (colWidth + gap));
    setActiveCol(Math.min(Math.max(idx, 0), STATUSES.length - 1));
  }, []);

  const scrollToCol = useCallback((idx: number) => {
    const el = boardRef.current;
    if (!el) return;
    const colWidth = el.querySelector('[data-col]')?.getBoundingClientRect().width ?? 300;
    el.scrollTo({ left: idx * (colWidth + 16), behavior: 'smooth' });
  }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? tasks : tasks.filter((t2) => t2.priority === filter)),
    [tasks, filter],
  );

  const counts = useMemo(() => ({
    todo: tasks.filter((t2) => t2.status === 'todo').length,
    progress: tasks.filter((t2) => t2.status === 'progress').length,
    done: tasks.filter((t2) => t2.status === 'done').length,
  }), [tasks]);

  const total = tasks.length;
  const donePct = total > 0 ? Math.round((counts.done / total) * 100) : 0;

  const handleDrop = useCallback((status: TaskStatus) => {
    if (!dragId) return;
    const task = tasks.find((t2) => t2.id === dragId);
    if (task && task.status !== status) {
      onMoveTask(dragId, status);
      const statusName = status === 'todo' ? t('todo') : status === 'progress' ? t('progressCol') : t('done');
      addToast(t('moved', { status: statusName }), 'info');
    }
    setDragId(null);
    setDragOver(null);
  }, [addToast, dragId, onMoveTask, t, tasks]);

  const handleDelete = useCallback((id: string, title: string) => {
    if (window.confirm(t('confirmDelete'))) {
      onDeleteTask(id);
      addToast(t('deleted'), 'warn');
    }
    void title;
  }, [addToast, onDeleteTask, t]);

  const submit = useCallback(() => {
    const ok = onSubmitTask();
    if (ok) {
      addToast(editingId ? t('updated') : t('created'), 'success');
    }
  }, [addToast, editingId, onSubmitTask, t]);

  const cardBase = theme === 'dark'
    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
    : 'border-gray-200 bg-white/70 hover:bg-white/90';

  const modalInput = theme === 'dark'
    ? 'border-gray-600 bg-gray-800 text-white focus-visible:border-violet-400'
    : 'border-gray-200 bg-white text-gray-800 focus-visible:border-violet-300';

  return (
    <div className={cn('rounded-3xl border p-6 shadow-2xl backdrop-blur-lg', theme === 'dark' ? 'border-gray-700 bg-gray-800/40' : 'border-white/30 bg-white/50')}>
      {/* Progress */}
      <div className={cn('mb-6 rounded-2xl p-5', theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50')}>
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
            <span>📊</span>
            {t('progress')}
          </span>
          <span className="font-display text-2xl font-extrabold text-violet-600">{donePct}%</span>
        </div>
        <div className="flex h-3 gap-1 rounded-full bg-gray-200 p-0.5 dark:bg-gray-900">
          {counts.todo > 0 && <div className="rounded-full bg-gradient-to-r from-neutral-400 to-neutral-500" style={{ width: `${(counts.todo / total) * 100}%` }} />}
          {counts.progress > 0 && <div className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${(counts.progress / total) * 100}%` }} />}
          {counts.done > 0 && <div className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" style={{ width: `${(counts.done / total) * 100}%` }} />}
        </div>
        <div className="mt-3 flex justify-between text-xs">
          <span className="flex items-center gap-1.5 text-gray-500"><span className="h-2 w-2 rounded-full bg-neutral-400" />{t('todo')} <b className="text-gray-700 dark:text-gray-300">{counts.todo}</b></span>
          <span className="flex items-center gap-1.5 text-gray-500"><span className="h-2 w-2 rounded-full bg-amber-400" />{t('progressCol')} <b className="text-gray-700 dark:text-gray-300">{counts.progress}</b></span>
          <span className="flex items-center gap-1.5 text-gray-500"><span className="h-2 w-2 rounded-full bg-emerald-500" />{t('done')} <b className="text-gray-700 dark:text-gray-300">{counts.done}</b></span>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
          🗂️ {t('title')}
        </h2>
        <div className={cn('flex gap-1 rounded-full p-1', theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
          {(['all', ...PRIORITIES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                filter === f ? 'bg-violet-600 text-white shadow' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600',
              )}
            >
              {f === 'all' ? t('filterAll') : f === 'high' ? `🔴 ${t('filterHigh')}` : f === 'medium' ? `🟡 ${t('filterMedium')}` : `🟢 ${t('filterLow')}`}
            </button>
          ))}
        </div>
      </div>

      {/* Board */}
      <div
        ref={boardRef}
        onScroll={onBoardScroll}
        className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] [scrollbar-width:none] md:grid-cols-3 md:overflow-visible md:[scroll-snap-type:none] [&::-webkit-scrollbar]:hidden"
      >
        {STATUSES.map((status, idx) => {
          const items = filtered.filter((t2) => t2.status === status);
          const col = COLUMN_THEME[status];
          return (
            <div
              key={status}
              data-col
              onDragOver={(e) => { e.preventDefault(); setDragOver(status); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(status)}
              className={cn(
                'snap-start rounded-2xl border p-3 transition-colors [flex:0_0_86vw] [max-w:380px] md:[flex:none] md:max-w-none',
                dragOver === status ? 'border-violet-300 bg-violet-50 dark:bg-violet-900/20' : theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/50',
              )}
            >
              <div className="mb-3 flex items-center justify-between border-b border-gray-200/50 pb-2 dark:border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg text-sm', col.iconWrap)}>{col.icon}</div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white">{t(status === 'progress' ? 'progressCol' : status)}</h3>
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-bold text-gray-500 dark:border-gray-700 dark:bg-gray-900">{items.length}</span>
              </div>

              <div className="flex min-h-[60px] flex-col gap-2">
                {items.length === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-400">📭 {t('empty')}</div>
                ) : (
                  items.map((task) => <TaskCard key={task.id} task={task} theme={theme} onDragStart={() => setDragId(task.id)} onEdit={() => onOpenModal(status, task.id)} onDelete={() => handleDelete(task.id, task.title)} />)
                )}
              </div>

              <button
                onClick={() => onOpenModal(status)}
                className="mt-2 w-full rounded-lg border-2 border-dashed border-gray-300 py-2 text-xs font-semibold text-gray-400 transition-colors hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600 dark:border-gray-600 dark:hover:bg-violet-900/20"
              >
                <Plus size={14} className="mr-1 inline" /> {t('addTask')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile dots */}
      <div className="mt-3 flex justify-center gap-2 md:hidden">
        {STATUSES.map((status, idx) => (
          <button
            key={status}
            onClick={() => scrollToCol(idx)}
            aria-label={`go to ${status}`}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              activeCol === idx ? 'scale-130 bg-violet-600' : 'bg-gray-300 dark:bg-gray-600',
            )}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
          onClick={(e) => e.target === e.currentTarget && onCloseModal()}
        >
          <div className={cn('w-full max-w-lg rounded-2xl p-6 shadow-xl', theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800')}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-extrabold">{editingId ? `✏️ ${t('editTask')}` : `＋ ${t('newTask')}`}</h2>
              <button onClick={onCloseModal} className="rounded-lg border border-gray-200 px-2 py-1 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"><X size={16} /></button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('taskTitle')} *</label>
                <input value={taskDraft.title} onChange={(e) => onUpdateDraft({ title: e.target.value })} className={cn('w-full rounded-lg border p-2.5 text-sm font-medium outline-none', modalInput)} required />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('taskDesc')}</label>
                <textarea value={taskDraft.desc} onChange={(e) => onUpdateDraft({ desc: e.target.value })} rows={2} className={cn('w-full resize-none rounded-lg border p-2.5 text-sm outline-none', modalInput)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('priority')}</label>
                  <select value={taskDraft.priority} onChange={(e) => onUpdateDraft({ priority: e.target.value as TaskPriority })} className={cn('w-full rounded-lg border p-2.5 text-sm outline-none', modalInput)}>
                    {PRIORITIES.map((p) => <option key={p} value={p}>{p === 'high' ? '🔴' : p === 'medium' ? '🟡' : '🟢'} {t(`priority${p.charAt(0).toUpperCase() + p.slice(1)}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('status')}</label>
                  <select value={taskDraft.status} onChange={(e) => onUpdateDraft({ status: e.target.value as TaskStatus })} className={cn('w-full rounded-lg border p-2.5 text-sm outline-none', modalInput)}>
                    {STATUSES.map((s) => <option key={s} value={s}>{t(s === 'progress' ? 'progressCol' : s)}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('tag')}</label>
                  <select value={taskDraft.tag} onChange={(e) => onUpdateDraft({ tag: e.target.value as TaskTag })} className={cn('w-full rounded-lg border p-2.5 text-sm outline-none', modalInput)}>
                    {TAGS.map((tg) => <option key={tg} value={tg}>{tg === 'general' ? t('noTag') : t(`tag${tg.charAt(0).toUpperCase() + tg.slice(1)}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('dueDate')}</label>
                  <input type="date" value={taskDraft.due} onChange={(e) => onUpdateDraft({ due: e.target.value })} className={cn('w-full rounded-lg border p-2.5 text-sm outline-none', modalInput)} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-600 dark:text-gray-300">{t('assignee')}</label>
                <select value={taskDraft.assignee} onChange={(e) => onUpdateDraft({ assignee: e.target.value })} className={cn('w-full rounded-lg border p-2.5 text-sm outline-none', modalInput)}>
                  {Object.entries(ASSIGNEES).map(([id, a]) => <option key={id} value={id}>{a.name}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                <button type="button" onClick={onCloseModal} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">{t('cancel')}</button>
                <button type="submit" className="rounded-lg bg-gradient-to-br from-violet-600 to-violet-700 px-5 py-2 text-sm font-bold text-white shadow">{t('submit')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  theme: ThemeMode;
  onDragStart: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function TaskCard({ task, theme, onDragStart, onEdit, onDelete }: TaskCardProps) {
  const t = useTranslations('Tasks');
  const assignee = ASSIGNEES[task.assignee] ?? ASSIGNEES['1'];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dueDate = task.due ? new Date(task.due) : null;
  const isOverdue = dueDate && dueDate < today && task.status !== 'done';
  const dueText = dueDate ? dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  const tagLabel = task.tag === 'general' ? t('tagGeneral') : t(`tag${task.tag.charAt(0).toUpperCase() + task.tag.slice(1)}`);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={cn('relative overflow-hidden rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md', theme === 'dark' ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-white')}
    >
      <div className={cn('absolute left-0 top-3 bottom-3 w-1 rounded-r', task.priority === 'high' ? 'bg-gradient-to-b from-red-400 to-red-500' : task.priority === 'medium' ? 'bg-gradient-to-b from-amber-400 to-amber-500' : 'bg-gradient-to-b from-emerald-400 to-emerald-500')} />
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex-1 text-sm font-bold leading-snug">{task.title}</div>
        <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap', PRIORITY_BADGE[task.priority])}>{t(`priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`)}</span>
      </div>
      {task.desc && <p className="mb-2 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">{task.desc}</p>}
      <div className="flex items-center justify-between">
        <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', TAG_BADGE[task.tag])}>{tagLabel}</span>
        <div className="flex gap-1">
          <button onClick={onEdit} className="rounded p-1 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600" aria-label="edit">✏️</button>
          <button onClick={onDelete} className="rounded p-1 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30" aria-label="delete"><Trash2 size={12} /></button>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 border-t border-gray-100 pt-2 dark:border-gray-700">
        <div className={cn('flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold text-white', AVATAR_GRADIENT[assignee.cls])} title={assignee.name}>{assignee.short}</div>
        {dueText && (
          <span className={cn('flex items-center gap-1 text-xs', isOverdue ? 'font-bold text-red-600' : 'text-gray-400')}>
            <Calendar size={12} />{dueText}{isOverdue ? ` ${t('overdue')}` : ''}
          </span>
        )}
      </div>
    </div>
  );
}
