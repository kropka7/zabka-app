import { ReactNode } from 'react';
import { Theme } from '../../App';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  theme?: Theme;
  className?: string;
  icon?: ReactNode;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  theme = 'dark',
  className = '',
  icon
}: BadgeProps) {
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const variantStyles = {
    success: theme === 'dark'
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200',
    
    warning: theme === 'dark'
      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200',
    
    error: theme === 'dark'
      ? 'bg-red-500/20 text-red-400 border-red-500/30'
      : 'bg-red-50 text-red-700 border-red-200',
    
    info: theme === 'dark'
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      : 'bg-blue-50 text-blue-700 border-blue-200',
    
    neutral: theme === 'dark'
      ? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      : 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

// Team-specific badge
type TeamType = 'HR' | 'Dział Prawny' | 'IT & Tech' | 'Marketing' | 'Ogólny' | 'All';

interface TeamBadgeProps {
  team: TeamType;
  size?: BadgeSize;
  theme?: Theme;
  className?: string;
}

export function TeamBadge({ team, size = 'md', theme = 'dark', className = '' }: TeamBadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const teamStyles = {
    'HR': theme === 'dark'
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      : 'bg-blue-50 text-blue-700 border-blue-200',
    
    'Dział Prawny': theme === 'dark'
      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      : 'bg-purple-50 text-purple-700 border-purple-200',
    
    'IT & Tech': theme === 'dark'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-green-50 text-green-700 border-green-200',
    
    'Marketing': theme === 'dark'
      ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      : 'bg-orange-50 text-orange-700 border-orange-200',
    
    'Ogólny': theme === 'dark'
      ? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      : 'bg-gray-100 text-gray-700 border-gray-200',
    
    'All': theme === 'dark'
      ? 'bg-[#00B67A]/20 text-[#00B67A] border-[#00B67A]/30'
      : 'bg-[#00B67A]/10 text-[#00B67A] border-[#00B67A]/30'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${sizeStyles[size]} ${teamStyles[team]} ${className}`}>
      {team}
    </span>
  );
}

// Status badge for messages
type StatusType = 'draft' | 'published' | 'scheduled' | 'pending-approval' | 'ready-to-publish';

interface StatusBadgeProps {
  status: StatusType;
  size?: BadgeSize;
  theme?: Theme;
  language?: 'pl' | 'en';
  className?: string;
}

export function StatusBadge({ status, size = 'md', theme = 'dark', language = 'pl', className = '' }: StatusBadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const statusStyles = {
    'published': theme === 'dark'
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200',
    
    'draft': theme === 'dark'
      ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      : 'bg-gray-100 text-gray-700 border-gray-200',
    
    'scheduled': theme === 'dark'
      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      : 'bg-purple-50 text-purple-700 border-purple-200',
    
    'pending-approval': theme === 'dark'
      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200',
    
    'ready-to-publish': theme === 'dark'
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      : 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const labels = {
    pl: {
      'draft': 'Szkic',
      'published': 'Opublikowany',
      'scheduled': 'Zaplanowany',
      'pending-approval': 'Oczekuje na akceptację',
      'ready-to-publish': 'Gotowy do publikacji'
    },
    en: {
      'draft': 'Draft',
      'published': 'Published',
      'scheduled': 'Scheduled',
      'pending-approval': 'Pending Approval',
      'ready-to-publish': 'Ready to Publish'
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${sizeStyles[size]} ${statusStyles[status]} ${className}`}>
      {labels[language][status]}
    </span>
  );
}