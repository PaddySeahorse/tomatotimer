'use client';

import { useState, useEffect, useRef } from 'react';
import Background from '@/components/Background';

// 图标组件
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_543_8119)">
      <path d="M2 3.5L21.5 12L2 20.5L5 12L2 3.5Z" fill="transparent"/>
      <path d="M5 12L2 20.5L21.5 12L2 3.5L5 12ZM5 12H10" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_543_8119">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M11 17 11 7H8V17H11ZM16 17 16 7H13L13 17H16Z" fill="currentColor"/>
    </g>
  </svg>
);

const StopIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="currentColor"/>
      <path d="M8 8H16V16H8V8Z" fill="currentColor"/>
    </g>
  </svg>
);

const RefreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M21.448 13C20.9483 17.7767 16.909 21.5 12 21.5C8.18227 21.5 4.89052 19.248 3.38065 16M2.5 20.5V15.5H5.5M2.55176 11C3.05145 6.22334 7.09079 2.5 11.9998 2.5C15.8175 2.5 19.1092 4.75197 20.6191 8M21.4998 3.5V8.5H18.4998" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
    </g>
  </svg>
);

const TaskIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="csxtask">
      <path id="fill1" d="M20 22V4H16V6H8V4H4V22H20Z" fill="transparent"/>
      <path id="fill2" d="M16 6H8V2H16V6Z" fill="transparent"/>
      <path id="stroke1" d="M16 4H20V22H4V4H8M16 4V2H8V4M16 4V6H8V4" strokeWidth="2" stroke="currentColor"/>
      <path id="stroke2" d="M10 12H14M10 16H14" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
    </g>
  </svg>
);

const AlarmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="aavalarm">
      <path id="fill1" d="M21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 13Z" fill="transparent"/>
      <path id="stroke1" d="M22.5 6.5L18.5 2.5M1.5 6.5L5.5 2.5M21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C16.9706 4 21 8.02944 21 13Z" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
      <path id="stroke2" d="M12 8.5V13L15 16" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
    </g>
  </svg>
);

const LightModeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_543_2115)">
      <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" fill="transparent" stroke="currentColor" strokeLinecap="square" strokeWidth="2"/>
      <path d="M19.7819 19.7762 19.7791 19.779 19.7764 19.7762 19.7791 19.7734 19.7819 19.7762ZM23.0029 11.9961V12H22.999V11.9961H23.0029ZM19.7791 4.2168 19.7819 4.21956 19.7791 4.22232 19.7764 4.21956 19.7791 4.2168ZM11.999.996094H12.0029V1H11.999V.996094ZM4.22525 4.21956 4.22249 4.22232 4.21973 4.21956 4.22249 4.2168 4.22525 4.21956ZM1.00293 11.9961V12H.999023V11.9961H1.00293ZM4.22249 19.7734 4.22525 19.7762 4.22249 19.779 4.21973 19.7762 4.22249 19.7734ZM11.999 22.9961H12.0029V23H11.999V22.9961Z" strokeLinecap="square" strokeWidth="2" stroke="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_543_2115">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const DarkModeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M20.5387 14.8522C20.0408 14.9492 19.5263 15 19 15C14.5817 15 11 11.4183 11 7C11 5.54296 11.3194 4.17663 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.9737 21 19.3459 18.4248 20.5387 14.8522Z" fill="transparent" strokeWidth="2" stroke="currentColor"/>
      <path d="M16.625 4 16.6692 4.08081 16.75 4.125 16.6692 4.16919 16.625 4.25 16.5808 4.16919 16.5 4.125 16.5808 4.08081 16.625 4ZM20.5 8.5 20.6768 8.82322 21 9 20.6768 9.17678 20.5 9.5 20.3232 9.17678 20 9 20.3232 8.82322 20.5 8.5Z" strokeWidth="2" stroke="currentColor"/>
    </g>
  </svg>
);

// 类型定义
type TimerState = 'focus' | 'shortBreak' | 'longBreak';
type ThemeMode = 'light' | 'dark';
type Task = {
  id: string;
  text: string;
  completed: boolean;
  plannedTime?: number; // 规划时长（分钟）
  note?: string; // 备注
};

export default function Pomodoro() {
  // 计时器状态
  const [state, setState] = useState<TimerState>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // 主题模式
  const [theme, setTheme] = useState<ThemeMode>('light');

  // 任务管理状态
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskNote, setNewTaskNote] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // 自定义时长状态
  const [customTime, setCustomTime] = useState(25);
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);

  // 任务规划时间状态
  const [newTaskPlannedTime, setNewTaskPlannedTime] = useState(25);

  // Toast 通知状态
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' }>>([]);

  // 动画相关
  const svgRef = useRef<SVGSVGElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  // 配置
  const getTimerConfig = () => ({
    focus: { time: customTime * 60, color: '#FF6B6B', label: '专注时间', bgColor: '#FF6B6B' },
    shortBreak: { time: 5 * 60, color: '#4ECDC4', label: '短休息', bgColor: '#4ECDC4' },
    longBreak: { time: 15 * 60, color: '#95E1D3', label: '长休息', bgColor: '#95E1D3' },
  });
  
  const timerConfig = getTimerConfig();

  // 计算圆环进度
  const circumference = 2 * Math.PI * 140; // r=140
  const progress = ((totalTime - timeLeft) / totalTime) * circumference;
  const strokeDashoffset = circumference - progress;

  // 添加 Toast 通知
  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // 计时器逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            addToast(`${timerConfig[state].label}结束！`, 'success');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, state]);

  // 全屏模式逻辑
  useEffect(() => {
    // 专注模式开始时自动进入全屏
    if (isRunning && state === 'focus' && !isFullscreen) {
      setIsFullscreen(true);
    }

    // 计时器停止或时间结束时退出全屏
    if ((!isRunning || timeLeft === 0) && isFullscreen) {
      const timer = setTimeout(() => setIsFullscreen(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isRunning, state, timeLeft, isFullscreen]);

  // ESC键退出全屏
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setIsRunning(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  // 切换计时器状态
  const switchState = (newState: TimerState) => {
    setState(newState);
    setIsRunning(false);
    const config = getTimerConfig();
    
    // 如果切换到专注模式，使用自定义时长；其他模式使用默认时长
    if (newState === 'focus') {
      setTotalTime(customTime * 60);
      setTimeLeft(customTime * 60);
    } else {
      setTotalTime(config[newState].time);
      setTimeLeft(config[newState].time);
    }
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 应用自定义时长
  const applyCustomTime = () => {
    if (customTime < 15 || customTime > 120) {
      addToast('时长必须在15-120分钟之间', 'info');
      return;
    }
    setTotalTime(customTime * 60);
    setTimeLeft(customTime * 60);
    setShowCustomTimeInput(false);
    addToast(`专注时长已设置为${customTime}分钟`, 'success');
  };

  // 添加任务
  const addTask = () => {
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
  };

  // 切换任务完成状态
  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 切换任务卡片展开/折叠
  const toggleTaskExpand = (id: string) => {
    setExpandedTaskId(prev => (prev === id ? null : id));
  };

  // 删除任务
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // 开始任务计时
  const startTask = (task: Task) => {
    if (task.plannedTime) {
      setTotalTime(task.plannedTime * 60);
      setTimeLeft(task.plannedTime * 60);
      setCustomTime(task.plannedTime);
    }
    setState('focus');
    setIsRunning(true);
  };

  return (
    <>
      {/* 固定背景层 - 始终渲染，不随状态切换 */}
      <Background theme={theme} timerState={state} />

      {/* 全屏模式 */}
      {isFullscreen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center animate-fadeIn">
          <div className="relative z-20 flex flex-col items-center">
            {/* 放大的SVG圆环进度条 */}
            <div className="mb-8">
              <div className="relative">
                <svg
                  width="500"
                  height="500"
                  viewBox="0 0 320 320"
                  className="transform -rotate-90"
                >
                  {/* 背景圆环 */}
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                    strokeWidth="12"
                  />
                  {/* 进度圆环 */}
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke={timerConfig[state].color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>
                {/* 时间显示 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-8xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className={`mt-2 text-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{timerConfig[state].label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-6">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-12 py-6 rounded-full text-white font-semibold text-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 flex items-center gap-3"
                style={{ backgroundColor: timerConfig[state].color }}
              >
                {isRunning ? (
                  <>
                    <PauseIcon />
                    暂停
                  </>
                ) : (
                  <>
                    <PlayIcon />
                    开始
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setIsFullscreen(false);
                  setTimeLeft(totalTime);
                }}
                className="px-10 py-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-2xl transition-all duration-300 hover:bg-gray-300 active:scale-95 flex items-center gap-3"
              >
                <StopIcon />
                终止
              </button>
            </div>

            {/* ESC键提示 */}
            <div className={`mt-8 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              按 ESC 键退出全屏
            </div>
          </div>
        </div>
      )}

      {/* 普通模式 */}
      {!isFullscreen && (
        <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 头部 */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>番茄钟</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>专注当下，成就未来</p>
          </div>
          
          {/* 右上角：功能按钮组 */}
          <div className="flex gap-3">
            {/* 主题切换按钮 */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white/50 hover:bg-white/80 text-gray-700'}`}
            >
              {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
          </div>
        </header>

        {/* 主内容 */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* 左侧：计时器 */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
            {/* 状态切换按钮 */}
            <div className={`flex justify-center gap-3 mb-8 ${isFullscreen ? 'opacity-50 pointer-events-none' : ''}`}>
              {(
                [
                  { key: 'focus' as TimerState, label: '专注' },
                  { key: 'shortBreak' as TimerState, label: '短休息' },
                  { key: 'longBreak' as TimerState, label: '长休息' },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => switchState(key)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    state === key
                      ? 'shadow-lg scale-105'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  style={{
                    backgroundColor: state === key ? timerConfig[key].color : 'transparent',
                    color: state === key ? 'white' : theme === 'dark' ? '#9CA3AF' : '#666',
                  }}
                  disabled={isFullscreen}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* SVG 圆环进度条 */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg
                  ref={svgRef}
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  className="transform -rotate-90"
                >
                  {/* 背景圆环 */}
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                    strokeWidth="12"
                  />
                  {/* 进度圆环 */}
                  <circle
                    ref={progressCircleRef}
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke={timerConfig[state].color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>
                {/* 时间显示 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{timerConfig[state].label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3"
                style={{ backgroundColor: timerConfig[state].color }}
              >
                {isRunning ? <><PauseIcon /> 暂停</> : <><PlayIcon /> 开始</>}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(totalTime);
                }}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <RefreshIcon />
                重置
              </button>
            </div>

            {/* 自定义时长 */}
            {showCustomTimeInput && (
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
                  onChange={(e) => setCustomTime(parseInt(e.target.value))}
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
                    onClick={applyCustomTime}
                    className="flex-1 px-6 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                  >
                    应用
                  </button>
                  <button
                    onClick={() => setShowCustomTimeInput(false)}
                    className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'dark' ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}

            {/* 自定义时长切换按钮 */}
            {!showCustomTimeInput && (
              <button
                onClick={() => setShowCustomTimeInput(true)}
                className={`w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                自定义时长
              </button>
            )}
          </div>

          {/* 右侧：任务管理 */}
          <div className={`bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 ${isFullscreen ? 'opacity-50 pointer-events-none' : ''} ${theme === 'dark' ? 'bg-gray-800/70 border-gray-700' : ''}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <TaskIcon />
                任务列表
              </h2>
              <button
                onClick={() => setShowTaskInput(!showTaskInput)}
                className="px-4 py-2 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
              >
                {showTaskInput ? '✕ 取消' : '+ 添加'}
              </button>
            </div>

            {/* 添加任务输入框 */}
            {showTaskInput && (
              <div className={`mb-6 p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
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
                    onChange={(e) => setNewTaskPlannedTime(parseInt(e.target.value))}
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
                    onChange={(e) => setNewTaskNote(e.target.value)}
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
                  onClick={addTask}
                  className="mt-3 w-full py-2 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                >
                  添加任务
                </button>
              </div>
            )}

            {/* 任务列表 */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.length === 0 ? (
                <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                  暂无任务，点击上方"添加"创建
                </div>
              ) : (
                tasks.map((task) => {
                  const isExpanded = expandedTaskId === task.id;
                  return (
                    <div
                      key={task.id}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                          : 'bg-white/50 hover:bg-white/80 border border-gray-200'
                      }`}
                    >
                      {/* 主任务行（始终显示） */}
                      <div className={`flex items-center gap-3 p-4 ${isExpanded ? 'pb-2' : ''}`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTask(task.id);
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
                        
                        <div className="flex-1 flex items-center gap-3">
                          <span
                            className={`${
                              task.completed
                                ? 'text-gray-400 line-through'
                                : theme === 'dark'
                                  ? 'text-gray-200'
                                  : 'text-gray-800'
                            }`}
                          >
                            {task.text}
                          </span>
                          
                          {/* 任务时长信息 */}
                          {task.plannedTime && (
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              {task.plannedTime}分钟
                            </span>
                          )}
                        </div>
                        
                        {/* 开始按钮（始终显示） */}
                        {!task.completed && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startTask(task);
                            }}
                            className="px-3 py-1.5 rounded-lg text-sm bg-rose-500 text-white hover:bg-rose-600 transition-colors flex items-center gap-1 flex-shrink-0"
                          >
                            <PlayIcon />
                            开始
                          </button>
                        )}
                        
                        {/* 展开/折叠指示器 */}
                        <button
                          onClick={() => toggleTaskExpand(task.id)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                            strokeWidth="2"
                          >
                            <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      {/* 展开后的详细信息 */}
                      {isExpanded && (
                        <div className="px-4 pb-4 ml-9 border-t border-gray-200/50 dark:border-gray-600/50 pt-3">
                          <div className="flex items-center gap-3 mb-3">
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
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
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
                })
              )}
            </div>
          </div>
        </div>

      {/* Toast 通知系统 */}
      <div className="fixed top-8 right-8 z-50 space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg border transition-all duration-300 transform ${
              toast.type === 'success'
                ? 'bg-green-100/90 border-green-200 text-green-800'
                : 'bg-blue-100/90 border-blue-200 text-blue-800'
            }`}
            style={{ animation: 'slideIn 0.3s ease-out' }}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <span className="text-2xl">✓</span>
              ) : (
                <span className="text-2xl">ℹ</span>
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 自定义动画 */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
      )}
    </>
  );
}
