'use client';

import { useState } from 'react';
import { generateContent } from '@/lib/ai/content-generator';
import { generateVariations, rewriteForPlatform } from '@/lib/ai/content-variations';
import { AIWriterInput, AIWriterSchema } from '@/lib/validations';
import ReactMarkdown from 'react-markdown';
import { Copy, RotateCw, Wand2, Download } from 'lucide-react';

const contentTypes = [
  { value: 'blog', label: '📝 Blog Article' },
  { value: 'story', label: '📖 Story' },
  { value: 'linkedin', label: '💼 LinkedIn Post' },
  { value: 'facebook', label: '👥 Facebook Post' },
  { value: 'wordpress', label: '📰 WordPress Article' },
  { value: 'substack', label: '📧 Substack Newsletter' },
  { value: 'quote', label: '✨ Quote' },
  { value: 'caption', label: '🎯 Caption' },
  { value: 'hashtag', label: '#️⃣ Hashtags' },
  { value: 'seo_title', label: '🔍 SEO Title' },
  { value: 'meta_description', label: '📋 Meta Description' },
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'creative', label: 'Creative' },
  { value: 'formal', label: 'Formal' },
];

const lengths = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];

export default function AIWriterPage() {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState<string>('blog');
  const [tone, setTone] = useState<string>('professional');
  const [length, setLength] = useState<string>('medium');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [tokensUsed, setTokensUsed] = useState(0);
  const [variations, setVariations] = useState<string[]>([]);
  const [showVariations, setShowVariations] = useState(false);

  const handleGenerate = async () => {
    setError('');
    setIsLoading(true);

    try {
      const validation = AIWriterSchema.safeParse({
        prompt,
        type: contentType,
        tone,
        length,
      });

      if (!validation.success) {
        setError(validation.error.errors[0].message);
        return;
      }

      const result = await generateContent({
        prompt,
        type: contentType,
        tone,
        length,
      });

      setGeneratedContent(result.content);
      setTokensUsed(result.tokensUsed);
      setVariations([]);
      setShowVariations(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!generatedContent) return;

    setIsLoading(true);
    try {
      const result = await generateVariations({
        content: generatedContent,
        type: contentType,
        count: 3,
      });

      setVariations(result.variations);
      setShowVariations(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate variations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRewriteForPlatform = async (platform: string) => {
    if (!generatedContent) return;

    setIsLoading(true);
    try {
      const result = await rewriteForPlatform(generatedContent, platform);
      setGeneratedContent(result.content);
      setTokensUsed(result.tokensUsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rewrite content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `content-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">✍️ AI Writer</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded bg-background"
              >
                {contentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded bg-background"
              >
                {tones.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded bg-background"
              >
                {lengths.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full px-3 py-2 border border-input rounded bg-background min-h-[120px]"
              />
            </div>

            {error && <div className="bg-destructive text-destructive-foreground p-3 rounded text-sm">{error}</div>}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Wand2 size={18} />
              {isLoading ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2 space-y-6">
          {generatedContent && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Generated Content</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-secondary text-secondary-foreground rounded hover:opacity-90"
                    title="Copy to clipboard"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-secondary text-secondary-foreground rounded hover:opacity-90"
                    title="Download as text"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
              </div>

              {tokensUsed > 0 && (
                <div className="text-sm text-muted-foreground border-t border-border pt-4">
                  Tokens used: {tokensUsed}
                </div>
              )}

              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                <button
                  onClick={handleGenerateVariations}
                  disabled={isLoading}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                >
                  <RotateCw size={16} />
                  Generate Variations
                </button>

                <button
                  onClick={() => handleRewriteForPlatform('linkedin')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 disabled:opacity-50"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleRewriteForPlatform('facebook')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 disabled:opacity-50"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleRewriteForPlatform('twitter')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 disabled:opacity-50"
                >
                  Twitter
                </button>
              </div>
            </div>
          )}

          {showVariations && variations.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold">Content Variations</h2>

              <div className="space-y-4">
                {variations.map((variation, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">Variation {index + 1}</h3>
                      <button
                        onClick={() => {
                          setGeneratedContent(variation);
                          setShowVariations(false);
                        }}
                        className="text-sm px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90"
                      >
                        Use This
                      </button>
                    </div>
                    <p className="text-muted-foreground">{variation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
