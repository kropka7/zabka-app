import { ReactNode } from 'react';
import { Theme } from '../../App';
import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  theme?: Theme;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  theme = 'dark',
  action,
  secondaryAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
        theme === 'dark'
          ? 'bg-[#1A1D3A] border border-[#00B67A]/30'
          : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          {icon}
        </div>
      </div>
      
      <h3 className={`text-xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <p className={`text-center max-w-md mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
      
      {action && (
        <div className="flex gap-3">
          <Button variant="primary" theme={theme} onClick={action.onClick}>
            {action.label}
          </Button>
          
          {secondaryAction && (
            <Button variant="secondary" theme={theme} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
