import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Content Brain',
  description: 'AI-powered content creation and knowledge management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* PRESERVE EXISTING NAV: merge AI Agents link into existing layout */}
        <nav className="p-4 border-b bg-gray-50">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            {/* Keep original nav items, if any. Add AI Agents link at the end. */}
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/ai-agents">AI Agents</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
