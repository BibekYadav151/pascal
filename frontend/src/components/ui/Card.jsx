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
    ? ""
    : "";

  const classes = `${baseClasses} ${
    variants[
      glassmorphism ? "glassmorphism" : gradient ? "gradient" : "default"
    ]
  } ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>

      {/* Content */}
      <div className="relative z-10">{children}</div>

    </div>
  );
};

export default Card;
