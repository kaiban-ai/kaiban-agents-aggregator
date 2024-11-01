import React from 'react';
import { Flame, ExternalLink } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  website?: string;
  icon?: React.ReactNode;
}

export function ToolCard({ name, description, website, icon }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-orange-50">
          {icon || <Flame className="w-5 h-5 text-orange-500" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}