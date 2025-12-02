import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Theme } from '../../App';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: Theme;
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  theme = 'dark',
  children,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  };

  const variantStyles = {
    primary: theme === 'dark'
      ? 'bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-lg shadow-[#10B981]/20 focus:ring-[#10B981]'
      : 'bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-lg shadow-[#10B981]/20 focus:ring-[#10B981]',
    
    secondary: theme === 'dark'
      ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white border border-[#00B67A]/30 hover:border-[#00B67A] focus:ring-[#00B67A]'
      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-[#10B981] shadow-sm focus:ring-[#10B981]',
    
    danger: theme === 'dark'
      ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500 focus:ring-red-500'
      : 'text-red-700 hover:text-red-800 hover:bg-red-50 border border-red-300 hover:border-red-500 focus:ring-red-500',
    
    ghost: theme === 'dark'
      ? 'text-gray-300 hover:text-white hover:bg-[#1A1D3A] focus:ring-[#00B67A]'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400',
    
    success: theme === 'dark'
      ? 'bg-[#00B67A] hover:bg-[#00A066] text-white shadow-lg shadow-[#00B67A]/30 focus:ring-[#00B67A]'
      : 'bg-[#00B67A] hover:bg-[#00A066] text-white shadow-lg shadow-[#00B67A]/20 focus:ring-[#00B67A]'
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}
