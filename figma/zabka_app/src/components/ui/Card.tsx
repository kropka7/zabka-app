import { ReactNode } from 'react';
import { Theme } from '../../App';

interface CardProps {
  children: ReactNode;
  theme?: Theme;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  theme = 'dark',
  className = '',
  padding = 'md',
  hover = false,
  onClick
}: CardProps) {
  
  const baseStyles = 'rounded-2xl border transition-all';
  
  const themeStyles = theme === 'dark'
    ? 'bg-[#1F2937] border-[#374151]'
    : 'bg-white border-[#E5E7EB] shadow-sm';
  
  const hoverStyles = hover
    ? theme === 'dark'
      ? 'hover:border-[#10B981] cursor-pointer'
      : 'hover:border-[#10B981] hover:shadow cursor-pointer'
    : '';
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={`${baseStyles} ${themeStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  theme?: Theme;
  className?: string;
  action?: ReactNode;
}

export function CardHeader({ children, theme = 'dark', className = '', action }: CardHeaderProps) {
  const borderStyles = theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]';
  
  return (
    <div className={`p-6 border-b ${borderStyles} flex items-center justify-between ${className}`}>
      <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {children}
      </h2>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  theme?: Theme;
  className?: string;
}

export function CardFooter({ children, theme = 'dark', className = '' }: CardFooterProps) {
  const borderStyles = theme === 'dark' ? 'border-[#374151]' : 'border-[#E5E7EB]';
  
  return (
    <div className={`p-6 border-t ${borderStyles} ${className}`}>
      {children}
    </div>
  );
}
