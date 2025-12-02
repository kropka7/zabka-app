import { ReactNode } from 'react';
import { Theme } from '../../App';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'red';
  change?: string;
  trend?: 'up' | 'down';
  theme?: Theme;
  onClick?: () => void;
  changeLabel?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  color,
  change,
  trend,
  theme = 'dark',
  onClick,
  changeLabel
}: StatCardProps) {
  const colorMap = theme === 'dark' ? {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-emerald-500/20 text-emerald-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
    red: 'bg-red-500/20 text-red-400'
  } : {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700'
  };

  return (
    <Card theme={theme} hover={!!onClick} onClick={onClick} padding="md" className="group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colorMap[color]} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {change && (
          <div className="flex flex-col items-end">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'up' ? 'text-[#10B981]' : 'text-red-500'
            }`}>
              <svg 
                className={`w-4 h-4 ${trend === 'down' ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span>{change}</span>
            </div>
            {changeLabel && (
              <span className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
      
      <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {label}
      </p>
      
      <p className={`text-3xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </p>
    </Card>
  );
}
