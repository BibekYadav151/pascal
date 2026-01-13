import React from "react";
import { Link } from "react-router-dom";

const AnimatedButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-900 focus:ring-offset-2",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-900 focus:ring-offset-2",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2",
    outline:
      "bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2",
    gradient:
      "bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-900 focus:ring-offset-2",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default AnimatedButton;
