'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function KnowledgeChatPage() {
  const { user, isLoading } = useAuth();

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">🧠 Knowledge Brain</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-card border border-border rounded-lg p-6 h-fit space-y-4">
            <h2 className="text-xl font-bold">Upload Documents</h2>
            <p className="text-sm text-muted-foreground">Upload PDF, DOCX, TXT, or Markdown files to build your knowledge base.</p>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-2">
              <p className="text-muted-foreground">Drag and drop files here</p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">Browse Files</button>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>✅ Supported formats: PDF, DOCX, TXT, Markdown</p>
              <p>✅ Max file size: 10MB</p>
              <p>✅ Build semantic index for fast search</p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 flex flex-col min-h-[600px]">
            <div className="flex-1 space-y-4 mb-4">
              <div className="text-center text-muted-foreground py-8">
                <p>No documents uploaded yet.</p>
                <p className="text-sm">Upload documents to start asking questions!</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <input
                type="text"
                placeholder="Ask a question about your documents..."
                className="w-full px-4 py-3 border border-input rounded bg-background"
                disabled
              />
              <button
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
                disabled
              >
                Send Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
