import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function CustomCheckbox({ 
  checked, 
  onChange, 
  label, 
  className = '',
  disabled = false 
}: CustomCheckboxProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}>
      <div 
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
          disabled 
            ? 'cursor-not-allowed' 
            : 'cursor-pointer'
        } ${
          checked
            ? 'border-[#00B67A] bg-transparent hover:bg-[rgba(0,182,122,0.1)]'
            : 'border-[#6B7280] bg-transparent hover:border-[rgba(0,182,122,0.4)] hover:bg-[rgba(0,182,122,0.1)]'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-[#00B67A]" viewBox="0 0 12 12" fill="none">
            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
