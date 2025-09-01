// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
   
  const variants = {
    primary: 'bg-[#3b396d] text-white hover:bg-[#2a285a] focus:ring-[#3b396d] shadow-sm',
    secondary: 'bg-white text-[#3b396d] border border-[#3b396d] hover:bg-[#f8f9ff] focus:ring-[#3b396d]',
    outline: 'bg-transparent text-[#3b396d] border border-[#3b396d] hover:bg-[#f8f9ff] focus:ring-[#3b396d]',
    ghost: 'bg-transparent text-[#3b396d] hover:bg-[#f8f9ff] focus:ring-[#3b396d]',
    accent: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button 
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;