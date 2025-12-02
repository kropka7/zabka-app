import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Theme } from '../../App';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: Theme;
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Input({
  theme = 'dark',
  label,
  error,
  helperText,
  icon,
  fullWidth = false,
  className = '',
  id,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;
  
  const baseStyles = 'rounded-[8px] px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#10B981] border';
  
  const themeStyles = theme === 'dark'
    ? 'bg-[#374151] border-[#4B5563] text-white placeholder-gray-500'
    : 'bg-[#F9FAFB] border-[#D1D5DB] text-gray-900 placeholder-gray-400';
  
  const errorStyles = error
    ? theme === 'dark'
      ? 'border-red-500 focus:ring-red-500'
      : 'border-red-500 focus:ring-red-500'
    : '';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const iconStyles = icon ? 'pl-11' : '';
  const passwordToggleStyles = isPasswordField ? 'pr-11' : '';

  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          type={inputType}
          className={`${baseStyles} ${themeStyles} ${errorStyles} ${widthStyles} ${iconStyles} ${passwordToggleStyles} ${className}`}
          {...props}
        />
        
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-[#10B981] rounded p-1`}
            aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
          >
            {showPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className={`mt-1.5 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className={`mt-1.5 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: Theme;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export function Textarea({
  theme = 'dark',
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'rounded-[8px] px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#10B981] border resize-none';
  
  const themeStyles = theme === 'dark'
    ? 'bg-[#374151] border-[#4B5563] text-white placeholder-gray-500'
    : 'bg-[#F9FAFB] border-[#D1D5DB] text-gray-900 placeholder-gray-400';
  
  const errorStyles = error
    ? theme === 'dark'
      ? 'border-red-500 focus:ring-red-500'
      : 'border-red-500 focus:ring-red-500'
    : '';
  
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={rows}
        className={`${baseStyles} ${themeStyles} ${errorStyles} ${widthStyles} ${className}`}
        {...props}
      />
      
      {error && (
        <p className={`mt-1.5 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className={`mt-1.5 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  theme?: Theme;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export function Select({
  theme = 'dark',
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  options,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'rounded-[8px] px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#10B981] border';
  
  const themeStyles = theme === 'dark'
    ? 'bg-[#374151] border-[#4B5563] text-white'
    : 'bg-[#F9FAFB] border-[#D1D5DB] text-gray-900';
  
  const errorStyles = error
    ? theme === 'dark'
      ? 'border-red-500 focus:ring-red-500'
      : 'border-red-500 focus:ring-red-500'
    : '';
  
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={selectId}
          className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        className={`${baseStyles} ${themeStyles} ${errorStyles} ${widthStyles} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className={`mt-1.5 text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className={`mt-1.5 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
