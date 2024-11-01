import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import newsSummaryTeam from '../team.kban.js';
import { TaskCard } from './components/TaskCard';
import { WorkflowStats } from './components/WorkflowStats';
import { WorkflowLogs } from './components/WorkflowLogs';
import { ToolCard } from './components/ToolCard';
import { ApiSettings } from './components/ApiSettings';

interface WorkflowStats {
  duration: number;
  totalTokenCount: number;
  totalCost: number;
}

export default function App() {
  const useTeamStore = newsSummaryTeam.useStore();
  const { agents, tasks, teamWorkflowStatus, workflowResult, workflowLogs, inputs } = useTeamStore(state => ({
    agents: state.agents,
    tasks: state.tasks,
    teamWorkflowStatus: state.teamWorkflowStatus,
    workflowResult: state.workflowResult,
    workflowLogs: state.workflowLogs,
    inputs: state.inputs,
  }));

  const [topic, setTopic] = useState(inputs.topics);
  const [userName, setUserName] = useState(inputs.userName);
  const [newsletters, setNewsletters] = useState(inputs.newsletters);
  const [workflowStats, setWorkflowStats] = useState<WorkflowStats | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  const generateNewsletter = async () => {
    try {
      setWorkflowStats(null);
      const output = await newsSummaryTeam.start({
        topics: topic,
        newsletters,
        userName: userName || 'Guest'
      });

      if (output.status === 'FINISHED' && output.stats) {
        const { costDetails, llmUsageStats, duration } = output.stats;
        setWorkflowStats({
          duration,
          totalTokenCount: llmUsageStats.inputTokens + llmUsageStats.outputTokens,
          totalCost: costDetails.totalCost
        });
      }
    } catch (error) {
      console.error('Error generating newsletter:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showBanner && (
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="max-w-7xl mx-auto pr-10">
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm text-center">
              <span role="img" aria-label="sparkles" className="inline-block">✨</span>
              <span>Demo of an AI Newsletter Curator powered by</span>
              <a href="https://www.kaibanjs.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-100">
                KaibanJS
              </a>
              <span>for agent orchestration,</span>
              <a href="https://www.firecrawl.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-100">
                Firecrawl
              </a>
              <span>for web crawling, and built with</span>
              <a href="https://stackblitz.com/bolt" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-100">
                Bolt
              </a>
            </div>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-blue-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content Column (60-70%) */}
          <div className="flex-1 space-y-6">
            {/* Newsletter Configuration */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="newsletters" className="block text-sm font-medium text-gray-700 mb-1">
                    Newsletters URLs
                  </label>
                  <input
                    id="newsletters"
                    type="text"
                    value={newsletters}
                    onChange={(e) => setNewsletters(e.target.value)}
                    placeholder="Enter newsletter URLs (comma-separated)..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate URLs with commas
                  </p>
                </div>
                <div>
                  <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">
                    Topics
                  </label>
                  <input
                    id="topics"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="E.g. 'ReactJS, NextJS'"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={generateNewsletter}
                  disabled={teamWorkflowStatus === 'RUNNING' || !topic || !newsletters}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Generate Newsletter
                </button>
              </div>
            </div>

            {/* System Activity */}
            {workflowLogs?.length > 0 && teamWorkflowStatus === 'RUNNING' && (
              <WorkflowLogs logs={workflowLogs} />
            )}

            {/* Generated Newsletter */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
              {!workflowResult && (
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Newsletter</h2>
              )}
              <div className="prose max-w-none">
                {workflowResult ? (
                  <ReactMarkdown>{workflowResult}</ReactMarkdown>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 h-64">
                    <p className="text-center">
                      No newsletter generated yet.<br />
                      Enter your topics and click 'Generate' to create one.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column (30-40%) */}
          <div className="w-[30%] space-y-6">
            {/* API Settings and Tools Row */}
            <div className="space-y-6">
              <ApiSettings />
              <ToolCard
                name="Firecrawl"
                description="Helps to crawl data from any website and convert it in markdown or HTML. It's also open-source."
                website="https://www.firecrawl.dev"
              />
              {workflowStats && <WorkflowStats stats={workflowStats} />}
            </div>

            {/* Task Board */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Task Board</h2>
              <div className="space-y-3">
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    status={task.status}
                    agent={task.agent}
                    task={task}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}