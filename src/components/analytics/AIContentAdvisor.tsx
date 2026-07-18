'use client';

import { useState, useEffect } from 'react';
import { Brain, Lightbulb } from 'lucide-react';

interface AdvisorData {
  recommendation: string;
  topPerformingType: string;
  engagementRates: Array<{
    type: string;
    engagementRate: number;
    averageViews: number;
    averageLikes: number;
    averageShares: number;
    averageComments: number;
  }>;
  dataPointsAnalyzed: number;
}

export default function AIContentAdvisor() {
  const [data, setData] = useState<AdvisorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdvisor();
  }, []);

  const fetchAdvisor = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/analytics/ai-advisor');
      
      if (!response.ok) {
        throw new Error('Failed to fetch AI recommendations');
      }
      
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('AI advisor error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
          <h3 className="text-lg font-semibold text-white">AI Content Advisor</h3>
        </div>
        <p className="text-slate-400">Analyzing your content performance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-red-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-red-400" />
          <h3 className="text-lg font-semibold text-white">AI Content Advisor</h3>
        </div>
        <p className="text-red-400 text-sm">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">AI Content Advisor</h3>
        </div>
        <p className="text-slate-400">No data available for analysis</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-700/50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600/20 rounded-lg">
          <Brain className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">🧠 AI Content Advisor</h3>
          <p className="text-xs text-slate-400">Analyzed {data.dataPointsAnalyzed} content pieces</p>
        </div>
      </div>

      {/* Top Performing Type */}
      {data.topPerformingType !== 'N/A' && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-green-400" />
            <p className="text-sm font-semibold text-green-400">Top Performing</p>
          </div>
          <p className="text-white">{data.topPerformingType}</p>
        </div>
      )}

      {/* AI Recommendation */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span className="text-purple-400">✨</span>
          Recommendations
        </h4>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {data.recommendation}
          </p>
        </div>
      </div>

      {/* Engagement Rates */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Performance By Type</h4>
        <div className="space-y-2">
          {data.engagementRates.map((item) => (
            <div
              key={item.type}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-white capitalize">{item.type}</p>
                <p className="text-xs text-slate-400">
                  Avg: {item.averageViews.toFixed(0)} views • {item.averageLikes.toFixed(1)} likes
                </p>
              </div>
              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full">
                  <p className="text-xs font-semibold text-purple-300">
                    {item.engagementRate.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={fetchAdvisor}
        className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
      >
        Refresh Analysis
      </button>
    </div>
  );
}
