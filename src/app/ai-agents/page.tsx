export const metadata = {
  title: 'AI Agents',
  description: 'Collection of AI agents — Coming Soon',
};

export default function AIAgentsPage() {
  const agents = [
    { emoji: '🤖', name: 'Coding Agent' },
    { emoji: '🌐', name: 'Website Builder' },
    { emoji: '🐞', name: 'Debug Agent' },
    { emoji: '📝', name: 'Content Agent' },
    { emoji: '🔍', name: 'Research Agent' },
  ];

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
        <p className="text-sm text-muted-foreground mb-8">
          A suite of agents to help with coding, websites, debugging, content, and research. Coming soon.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="border rounded-lg p-6 flex flex-col items-start gap-3 hover:shadow-md transition-shadow bg-white"
            >
              <div className="text-2xl">{agent.emoji}</div>
              <h2 className="text-lg font-semibold">{agent.name}</h2>
              <div className="mt-auto text-sm text-muted-foreground">Coming Soon</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
