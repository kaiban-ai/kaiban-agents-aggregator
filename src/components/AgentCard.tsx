import React from 'react';
import { Bot, Loader2, Brain, Wrench, AlertCircle, Cpu, Flame } from 'lucide-react';

interface Tool {
  name: string;
  logo?: string;
  website?: string;
}

interface AgentCardProps {
  name: string;
  role: string;
  status: string;
  llmConfig?: {
    model: string;
  };
  tools?: Tool[];
}

export function AgentCard({ name, role, status, llmConfig, tools }: AgentCardProps) {
  const isWorking = status !== 'INITIAL' && status !== 'FINAL_ANSWER' && status !== 'TASK_COMPLETED';

  const getStatusDetails = () => {
    switch (status) {
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
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          label: 'Processing',
          color: 'text-blue-500',
          bg: 'bg-blue-50'
        };
      case 'FINAL_ANSWER':
      case 'TASK_COMPLETED':
        return {
          icon: <Bot className="w-4 h-4" />,
          label: 'Completed',
          color: 'text-green-500',
          bg: 'bg-green-50'
        };
      case 'MAX_ITERATIONS_ERROR':
      case 'AGENTIC_LOOP_ERROR':
      case 'WEIRD_LLM_OUTPUT':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Error',
          color: 'text-red-500',
          bg: 'bg-red-50'
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

  return (
    <div className={`relative bg-white rounded-lg p-4 shadow-sm border transition-all duration-300 ${
      isWorking 
        ? 'border-blue-400 ring-2 ring-blue-100 transform scale-102 -translate-y-1' 
        : 'border-gray-100 hover:border-gray-200'
    }`}>
      {isWorking && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-r animate-pulse" />
      )}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isWorking ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <Bot className={`w-5 h-5 ${isWorking ? 'text-blue-500' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${isWorking ? 'text-blue-600' : 'text-gray-900'}`}>
              {name}
            </h3>
            <p className="text-sm text-gray-600">{role}</p>
            <div className="flex flex-col gap-1 mt-2">
              {llmConfig?.model && (
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{llmConfig.model}</span>
                </div>
              )}
              {tools?.map((tool, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  {tool.name === 'Firecrawl' ? (
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-orange-500" />
                      <a
                        href="https://www.firecrawl.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Firecrawl
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">{tool.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusDetails.bg}`}>
          {statusDetails.icon}
          <span className={`text-sm font-medium ${statusDetails.color}`}>
            {statusDetails.label}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          isWorking ? 'bg-blue-500 animate-pulse' :
          status === 'TASK_COMPLETED' || status === 'FINAL_ANSWER' ? 'bg-green-500' :
          status.includes('ERROR') ? 'bg-red-500' :
          'bg-gray-300'
        }`} />
        <span className={`text-sm ${
          isWorking ? 'text-blue-500 font-medium' : 'text-gray-500'
        }`}>
          {status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
        </span>
      </div>
    </div>
  );
}