import React from "react";

const Card = ({ className = "", variant = "default", children, ...props }) => {
  const baseClasses = "rounded-2xl border bg-white transition-all duration-200";
  const variants = {
    default: "border-gray-100 shadow-sm hover:shadow-md",
    elevated: "border-gray-200 shadow-md hover:shadow-lg",
    gradient: "border-0 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md",
    glass: "border-white/20 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-6 pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };
