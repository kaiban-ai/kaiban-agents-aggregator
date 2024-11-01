import React from 'react';
import { Clock, Cpu, DollarSign } from 'lucide-react';

interface WorkflowStatsProps {
  stats: {
    duration: number;
    totalTokenCount: number;
    totalCost: number;
  };
}

export function WorkflowStats({ stats }: WorkflowStatsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Workflow Statistics</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">{stats.duration.toFixed(2)}s</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Cpu className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Tokens</p>
            <p className="font-semibold text-gray-900">{stats.totalTokenCount.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="font-semibold text-gray-900">${stats.totalCost.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}