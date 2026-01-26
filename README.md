# Tomato Timer

Tomato Timer 是一个功能丰富的 Pomodoro 番茄计时器应用，采用 Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 构建，使用 shadcn/ui 组件库提供优雅的用户界面。

## 项目概述

本项目基于 Next.js App Router 构建，提供完整的专注计时体验：包含多模式计时、任务规划、主题切换、通知提醒以及沉浸式动画背景等能力。

## 主要功能

- 支持专注（Focus）、短休（Short Break）、长休（Long Break）三种模式
- 动画化的圆形进度条显示
- 全屏模式支持
- 深色/浅色主题切换
- 自定义计时时长
- 任务规划器（支持笔记和计划用时）
- 实时通知提醒
- 基于动画背景的沉浸式体验

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 项目结构

- `src/app/` - Next.js App Router 和页面
- `src/components/` - React 组件
- `src/hooks/` - 自定义 React Hooks
- `src/lib/` - 工具函数
- `public/assets/` - 静态资源（背景动画等）

## 技术栈

- Next.js 16.1.1 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4
- shadcn/ui (基于 Radix UI)
- Lucide React (图标库)
- Sonner (Toast 通知)

## 开发指南

- 使用 pnpm 管理依赖（不要使用 npm 或 yarn）
- 优先使用 shadcn/ui 组件
- 遵循 TypeScript 类型安全实践
- 使用 `@/` 路径别名导入模块
