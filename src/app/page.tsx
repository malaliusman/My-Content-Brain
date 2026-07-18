export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">My Content Brain</h1>
        <p className="text-lg text-muted-foreground mb-8">
          AI-powered content creation and knowledge management
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            Sign In
          </a>
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
