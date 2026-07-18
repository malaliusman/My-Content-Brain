'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PublishingChartProps {
  range: string;
}

interface PublishingData {
  platform: string;
  published: number;
  failed: number;
  pending: number;
}

export default function PublishingChart({ range }: PublishingChartProps) {
  const [data, setData] = useState<PublishingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishingData();
  }, [range]);

  const fetchPublishingData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData = [
        { platform: 'LinkedIn', published: 45, failed: 2, pending: 3 },
        { platform: 'WordPress', published: 30, failed: 1, pending: 2 },
        { platform: 'Facebook', published: 25, failed: 0, pending: 1 },
        { platform: 'Threads', published: 15, failed: 1, pending: 0 },
      ];
      setData(mockData);
    } catch (error) {
      console.error('Publishing chart error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Publishing Performance</h3>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="platform" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Bar dataKey="published" fill="#10b981" name="Published" />
            <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
