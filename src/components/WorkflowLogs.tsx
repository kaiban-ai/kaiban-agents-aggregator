import React, { useState } from 'react';
import { Terminal, ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import newsSummaryTeam from '../../team.kban.js';

interface WorkflowLog {
  logType: 'AgentStatusUpdate' | 'TaskStatusUpdate' | 'WorkflowStatusUpdate';
  logDescription: string;
  timestamp: number;
  metadata?: {
    taskId?: string;
    taskStatus?: string;
    taskTitle?: string;
  };
}

interface WorkflowLogsProps {
  logs: WorkflowLog[];
}

export function WorkflowLogs({ logs }: WorkflowLogsProps) {
  const [showMetadata, setShowMetadata] = useState(false);
  const [feedback, setFeedback] = useState('');
  const latestLog = logs[logs.length - 1];

  if (!latestLog) return null;

  const hasMetadata = latestLog.metadata && Object.keys(latestLog.metadata).length > 0;
  const isTaskBlocked = latestLog.metadata?.taskStatus === 'BLOCKED';
  const taskId = latestLog.metadata?.taskId;

  const handleFeedbackSubmit = async () => {
    if (!taskId || !feedback.trim()) return;
    
    try {
      await newsSummaryTeam.provideFeedback(taskId, feedback);
      setFeedback('');
    } catch (error) {
      console.error('Error providing feedback:', error);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 text-gray-200 font-mono text-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="font-medium">System Activity</span>
        </div>
        {isTaskBlocked && (
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
            Task Blocked
          </span>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <span className="text-blue-400">→</span>
          <p className="leading-relaxed break-words">{latestLog.logDescription}</p>
        </div>

        {hasMetadata && (
          <div className="mt-3 border-t border-gray-700 pt-3">
            <button
              onClick={() => setShowMetadata(!showMetadata)}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {showMetadata ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="text-xs">Details</span>
            </button>
            {showMetadata && (
              <pre className="mt-2 p-2 bg-gray-900 rounded text-xs overflow-x-auto">
                {JSON.stringify(latestLog.metadata, null, 2)}
              </pre>
            )}
          </div>
        )}

        <div className="mt-2 text-xs text-gray-400">
          {new Date(latestLog.timestamp).toLocaleTimeString()}
        </div>

        {isTaskBlocked && taskId && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300">Feedback Required</span>
            </div>
            <div className="space-y-3">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide your feedback to help the agent..."
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors resize-none"
                rows={3}
              />
              <button
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim()}
                className="w-full px-4 py-2 bg-amber-500 text-gray-900 rounded-lg font-medium hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}