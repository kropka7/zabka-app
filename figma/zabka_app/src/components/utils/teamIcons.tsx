import { Users, Scale, Monitor, Megaphone, Building2 } from 'lucide-react';

export const teamConfig = {
  'HR': {
    color: '#3B82F6', // blue-500
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500',
    icon: Users
  },
  'Dział Prawny': {
    color: '#A855F7', // purple-500
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500',
    icon: Scale
  },
  'IT & Tech': {
    color: '#1E40AF', // blue-800 (navy/granatowy)
    bgColor: 'bg-blue-800',
    textColor: 'text-blue-300',
    borderColor: 'border-blue-800',
    icon: Monitor
  },
  'Marketing': {
    color: '#F97316', // orange-500
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500',
    icon: Megaphone
  },
  'Ogólny': {
    color: '#6B7280', // gray-500
    bgColor: 'bg-gray-500',
    textColor: 'text-gray-400',
    borderColor: 'border-gray-500',
    icon: Building2
  }
} as const;

export type TeamName = keyof typeof teamConfig;