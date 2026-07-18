'use client';

import { Download } from 'lucide-react';

interface ExportButtonProps {
  range: string;
}

export default function ExportButton({ range }: ExportButtonProps) {
  const handleExportCSV = async () => {
    try {
      const response = await fetch(`/api/analytics/export?range=${range}&format=csv`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${range}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch(`/api/analytics/export?range=${range}&format=pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${range}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportCSV}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        <Download className="w-4 h-4" />
        CSV
      </button>
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        <Download className="w-4 h-4" />
        PDF
      </button>
    </div>
  );
}
