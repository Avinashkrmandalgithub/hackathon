import React from "react";

const Button = ({ 
  className = "", 
  variant = "default", 
  size = "md", 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    warning: "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus-visible:ring-blue-500"
  };
  
  const sizes = {
    sm: "text-sm px-3 py-2 rounded-lg",
    md: "text-sm px-4 py-2 rounded-xl",
    lg: "text-base px-6 py-3 rounded-xl",
    xl: "text-lg px-8 py-4 rounded-2xl"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
