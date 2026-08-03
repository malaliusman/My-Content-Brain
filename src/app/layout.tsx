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
        <nav className="p-4 border-b bg-gray-50">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/ai-agents">AI Agents</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
