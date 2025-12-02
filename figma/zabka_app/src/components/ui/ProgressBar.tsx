import { Theme } from '../../App';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  valueLabel?: string;
  color?: string;
  theme?: Theme;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  color = 'bg-[#10B981]',
  theme = 'dark',
  showPercentage = false,
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div>
      {(label || valueLabel || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {label}
            </span>
          )}
          {(valueLabel || showPercentage) && (
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {valueLabel || `${Math.round(percentage)}%`}
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full rounded-full ${sizeStyles[size]} ${
        theme === 'dark' ? 'bg-[#374151]' : 'bg-[#F3F4F6]'
      }`}>
        <div
          className={`${color} ${sizeStyles[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
