import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Key } from 'lucide-react';

interface ApiSettings {
  openaiKey: string;
  firecrawlKey: string;
}

export function ApiSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showFirecrawl, setShowFirecrawl] = useState(false);
  const [settings, setSettings] = useState<ApiSettings>({
    openaiKey: '',
    firecrawlKey: ''
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('apiSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage when they change
  const updateSettings = (newSettings: Partial<ApiSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('apiSettings', JSON.stringify(updated));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-900">API Settings</span>
        </div>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showOpenAI ? 'text' : 'password'}
                value={settings.openaiKey}
                onChange={(e) => updateSettings({ openaiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showOpenAI ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Get your API key from{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                OpenAI's dashboard
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firecrawl API Key
            </label>
            <div className="relative">
              <input
                type={showFirecrawl ? 'text' : 'password'}
                value={settings.firecrawlKey}
                onChange={(e) => updateSettings({ firecrawlKey: e.target.value })}
                placeholder="fc-..."
                className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowFirecrawl(!showFirecrawl)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showFirecrawl ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Get your API key from{' '}
              <a
                href="https://www.firecrawl.dev/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Firecrawl's dashboard
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}