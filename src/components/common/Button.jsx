// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  // Custom hover style props for more flexibility
  hoverBgClass = '',
  hoverTextColorClass = '',
  hoverBorderClass = '',
  className = '', 
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Base classes for all buttons
  // font-sans ensures Outfit is used (assuming it's set as the sans font in Tailwind)
  const baseClasses = 'inline-flex items-center justify-center font-sans font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
   
  // Variants using the names from tailwind.config.js
  const variants = {
    // Primary: Solid fill with the brand color (Logo Dark Blue)
    primary: 'bg-logo-dark-blue text-white hover:bg-[#2a285a] focus:ring-logo-dark-blue border border-transparent',
    // Secondary: White background, brand color border/text
    secondary: 'bg-white text-logo-dark-blue border border-logo-dark-blue hover:bg-gray-50 focus:ring-logo-dark-blue',
    // Outline: Transparent background, brand color border/text
    // Improved default hover: subtle brand color tint instead of generic gray
    outline: `bg-transparent text-logo-dark-blue border border-logo-dark-blue hover:bg-logo-dark-blue/10 focus:ring-logo-dark-blue ${hoverBgClass} ${hoverTextColorClass} ${hoverBorderClass}`,
    // Ghost: Transparent background, brand color text, subtle hover
    ghost: 'bg-transparent text-logo-dark-blue hover:bg-gray-100 focus:ring-logo-dark-blue border border-transparent',
    // Accent/Danger: These should ideally also come from your theme config if they are part of the design system
    // For now, keeping them with standard Tailwind colors, but consider adding them to tailwind.config.js if they are official
    accent: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
  };
  
  // Consistent sizing using Tailwind's default padding/text sizes
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base'
  };
  
  // Combine all classes
  // Ensure custom hover classes passed in via props are included
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