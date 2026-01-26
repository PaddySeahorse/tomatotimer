import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Tomato Timer - 番茄计时器',
    template: '%s | Tomato Timer',
  },
  description:
    '一个功能丰富的 Pomodoro 番茄计时器应用，帮助您专注工作，提高效率。',
  keywords: [
    'Tomato Timer',
    '番茄计时器',
    'Pomodoro',
    '专注计时',
    '时间管理',
    '效率工具',
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
