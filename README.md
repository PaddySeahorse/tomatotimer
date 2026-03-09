# Tomato Timer 🍅

Tomato Timer 是一款功能丰富、界面优雅的 Pomodoro（番茄钟）计时器应用。采用 Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 构建，并结合了 shadcn/ui 的设计语言，致力于为你提供沉浸式的专注体验。

## 🌟 项目概述

本项目基于 Next.js App Router 构建，提供完整的专注计时与任务管理体验。通过多模式切换、自定义设定、任务规划与沉浸式动态背景，帮助你更高效地管理时间，提升工作与学习效率。

## ✨ 主要特性

- 🎯 **多模式计时**：支持专注（Focus）、短休（Short Break）、长休（Long Break）三种无缝切换的模式。
- ⏳ **可视化倒计时**：精美的动画化圆形进度条，时间流逝一目了然。
- 🖥️ **沉浸体验**：支持全屏模式及基于动画背景的沉浸式体验。
- 🌓 **个性化主题**：无缝的深色/浅色模式切换。
- ⚙️ **高度定制**：可根据个人习惯自定义各类计时时长。
- 📝 **任务规划器**：内置简易的任务清单与笔记功能，支持预估专注用时。
- 🔔 **实时提醒**：计时结束时的系统通知提醒，不错过每一个休息节点。

## 🚀 快速开始

### 前置要求

- Node.js (推荐 v20.x 或以上版本)
- [pnpm](https://pnpm.io/) 作为包管理器

### 安装与运行

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可预览。

### 构建与部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 📂 项目结构

- `src/app/` - Next.js App Router 路由与页面入口
- `src/components/` - 可复用的 React 视图与功能组件
- `src/hooks/` - 自定义状态逻辑 React Hooks
- `src/lib/` - 辅助工具函数与公共逻辑
- `public/assets/` - 静态资源（包括动画背景等）

## 🛠 技术栈

- **框架**: [Next.js](https://nextjs.org/) 16.1.1 (App Router) & React 19
- **语言**: [TypeScript](https://www.typescriptlang.org/) 5
- **样式**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/) (基于 Radix UI)
- **图标库**: Lucide React
- **提示通知**: Sonner (Toast)

## 👨‍💻 开发指南

- **包管理**：项目强制使用 `pnpm` 管理依赖，请勿使用 `npm` 或 `yarn`。
- **组件规范**：开发新功能时请优先考虑复用 `shadcn/ui` 提供的高质量基础组件。
- **类型安全**：请严格遵循 TypeScript 类型安全实践，运行 `pnpm ts-check` 可检查类型错误。
- **路径别名**：通过 `@/` 别名快速引入 `src/` 目录下的模块。
- **代码检查**：运行 `pnpm lint` 检查 ESLint 规范，运行 `pnpm test` 执行单元测试。

## 🙏 致谢 (Acknowledgements)

- 感谢 [shadcn/ui](https://ui.shadcn.com/) 提供优秀的组件库与设计。
- **本项目中的部分图标资源使用了 [TDesign (tdesign.tencent.com)](https://tdesign.tencent.com) 的设计资源，非常感谢其开源和共享。**

## 📄 开源协议

本项目基于 **MIT License** 开源。详情请参阅项目中的 [LICENSE](LICENSE) 文件。

Copyright (c) 2026 PaddySeahorse
