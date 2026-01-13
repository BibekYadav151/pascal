import React from "react";

const Card = ({
  children,
  className = "",
  hover = true,
  glassmorphism = false,
  gradient = false,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-xl border bg-white transition-all duration-200 ease-out";

  const variants = {
    default: "border-gray-200 shadow-sm",
    glassmorphism: "bg-white/95 backdrop-blur-lg border-white/20 shadow-lg",
    gradient:
      "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 shadow-md",
  };

  const hoverClasses = hover
    ? "hover:shadow-lg hover:shadow-gray-900/10 hover:-translate-y-0.5"
    : "";

  const classes = `${baseClasses} ${
    variants[
      glassmorphism ? "glassmorphism" : gradient ? "gradient" : "default"
    ]
  } ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {/* Subtle gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </div>
  );
};

export default Card;
