'use client';

import { useState, useEffect } from 'react';
import StatCard from '@/components/analytics/StatCard';
import ContentChart from '@/components/analytics/ContentChart';
import AIUsageChart from '@/components/analytics/AIUsageChart';
import PublishingChart from '@/components/analytics/PublishingChart';
import AIContentAdvisor from '@/components/analytics/AIContentAdvisor';
import ExportButton from '@/components/analytics/ExportButton';
import TimeRangeFilter from '@/components/analytics/TimeRangeFilter';
import { BarChart3, Brain, Zap, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  contentCreated: number;
  published: number;
  tokensUsed: number;
  topPlatform: string;
  totalEngagement: number;
  dateRange: string;
}

export default function AnalyticsDashboard() {
  const [range, setRange] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/analytics/overview?range=${range}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-10 h-10 text-blue-400" />
            My Content Brain Analytics
          </h1>
          <p className="text-slate-400">Track your content performance and AI usage</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <TimeRangeFilter value={range} onChange={setRange} />
          <ExportButton range={range} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
            <div className="inline-block">
              <div className="animate-spin">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <p className="text-slate-400 mt-4">Loading your analytics...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400 mb-8">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Stats Cards */}
        {analyticsData && !loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Content Created"
                value={analyticsData.contentCreated}
                icon="✍️"
                change="+12%"
                changeType="positive"
              />
              <StatCard
                title="Published Posts"
                value={analyticsData.published}
                icon="🚀"
                change="+8%"
                changeType="positive"
              />
              <StatCard
                title="AI Tokens Used"
                value={Math.round(analyticsData.tokensUsed / 1000)}
                suffix="K"
                icon="🧠"
                change="+25%"
                changeType="positive"
              />
              <StatCard
                title="Total Engagement"
                value={analyticsData.totalEngagement}
                icon="📈"
                change="+18%"
                changeType="positive"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ContentChart range={range} />
              <AIUsageChart range={range} />
            </div>

            {/* Publishing Performance */}
            <div className="mb-8">
              <PublishingChart range={range} />
            </div>

            {/* AI Content Advisor */}
            <div className="mb-8">
              <AIContentAdvisor />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
