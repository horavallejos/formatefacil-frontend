import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 font-heading font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant";
  
  const variants = {
    // Primary uses the new animated gradient
    primary: "bg-gradient-animate text-black border-none shadow-[0_0_15px_rgba(255,159,28,0.4)] hover:shadow-[0_0_25px_rgba(255,159,28,0.6)] hover:text-white",
    secondary: "bg-neon-blue text-black border-2 border-neon-blue hover:shadow-neon-blue hover:bg-white hover:border-white",
    outline: "bg-transparent text-neon-orange border-2 border-neon-orange hover:bg-neon-orange hover:text-black hover:shadow-neon-orange"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};