import React, { useState } from 'react';
import { Bot, Loader2, Brain, Wrench, AlertCircle, MessageSquare, X, Cpu, Activity } from 'lucide-react';

interface TaskCardProps {
  title: string;
  status: string;
  agent?: any;
  task?: {
    id: string;
    result?: any;
    description?: string;
  };
}

export function TaskCard({ title, status, agent, task }: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isActive = status === 'DOING';
  const isBlocked = status === 'BLOCKED';
  const isRevising = status === 'REVISE';
  const isDone = status === 'DONE';
  const agentStatus = agent?.status || 'IDLE';

  const getStatusDetails = () => {
    switch (status) {
      case 'BLOCKED':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Blocked',
          color: 'text-amber-500',
          bg: 'bg-amber-50'
        };
      case 'REVISE':
        return {
          icon: <MessageSquare className="w-4 h-4" />,
          label: 'Revising',
          color: 'text-purple-500',
          bg: 'bg-purple-50'
        };
      case 'DOING':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          label: 'Doing',
          color: 'text-blue-500',
          bg: 'bg-blue-50'
        };
      case 'DONE':
        return {
          icon: <Bot className="w-4 h-4" />,
          label: 'Completed',
          color: 'text-green-500',
          bg: 'bg-green-50'
        };
      default:
        return {
          icon: <Bot className="w-4 h-4" />,
          label: 'Todo',
          color: 'text-gray-400',
          bg: 'bg-gray-50'
        };
    }
  };

  const getAgentStatusDetails = () => {
    switch (agentStatus) {
      case 'THINKING':
      case 'THOUGHT':
        return {
          icon: <Brain className="w-4 h-4" />,
          label: 'Thinking',
          color: 'text-purple-500',
          bg: 'bg-purple-50'
        };
      case 'EXECUTING_ACTION':
      case 'USING_TOOL':
        return {
          icon: <Wrench className="w-4 h-4" />,
          label: 'Using Tool',
          color: 'text-amber-500',
          bg: 'bg-amber-50'
        };
      case 'OBSERVATION':
        return {
          icon: <Activity className="w-4 h-4" />,
          label: 'Processing',
          color: 'text-blue-500',
          bg: 'bg-blue-50'
        };
      default:
        return {
          icon: <Bot className="w-4 h-4" />,
          label: 'Idle',
          color: 'text-gray-400',
          bg: 'bg-gray-50'
        };
    }
  };

  const statusDetails = getStatusDetails();
  const agentStatusDetails = getAgentStatusDetails();

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className={`relative bg-white rounded-lg shadow-sm border transition-all duration-300 cursor-pointer ${
          isActive ? 'border-blue-400 ring-2 ring-blue-100' :
          isBlocked ? 'border-amber-400 ring-2 ring-amber-100' :
          isRevising ? 'border-purple-400 ring-2 ring-purple-100' :
          'border-gray-100 hover:border-gray-200'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-medium ${
              isActive ? 'text-blue-600' :
              isBlocked ? 'text-amber-600' :
              isRevising ? 'text-purple-600' :
              'text-gray-900'
            }`}>
              {title}
            </h3>
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusDetails.bg} ${statusDetails.color}`}>
              <div className="flex items-center gap-1.5">
                {statusDetails.icon}
                {statusDetails.label}
              </div>
            </div>
          </div>

          {agent && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className={`w-4 h-4 ${
                    isActive ? 'text-blue-500' :
                    isBlocked ? 'text-amber-500' :
                    isRevising ? 'text-purple-500' :
                    'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">{agent.name}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${agentStatusDetails.bg} ${agentStatusDetails.color}`}>
                  {agentStatusDetails.icon}
                  {agentStatusDetails.label}
                </div>
              </div>
            </div>
          )}

          <div className="mt-2 text-xs text-gray-500">
            Click to view details
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 mt-2 rounded-full text-xs ${statusDetails.bg} ${statusDetails.color}`}>
                  {statusDetails.icon}
                  {statusDetails.label}
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
              {/* Task Description */}
              {task?.description && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{task.description}</p>
                </div>
              )}

              {/* Agent Details */}
              {agent && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Agent Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{agent.name}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${agentStatusDetails.bg} ${agentStatusDetails.color}`}>
                        {agentStatusDetails.icon}
                        {agentStatusDetails.label}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Role</h5>
                      <p className="text-sm text-gray-600">{agent.role}</p>
                    </div>

                    {agent.background && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Background</h5>
                        <p className="text-sm text-gray-600">{agent.background}</p>
                      </div>
                    )}

                    {agent.goal && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Goal</h5>
                        <p className="text-sm text-gray-600">{agent.goal}</p>
                      </div>
                    )}

                    {agent.llmConfig?.model && (
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{agent.llmConfig.model}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Task Result */}
              {isDone && task?.result && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Task Result</h4>
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
                    {typeof task.result === 'string' 
                      ? task.result 
                      : JSON.stringify(task.result, null, 2)
                    }
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}