import React from 'react';

const GradientText = ({
  children,
  className = '',
  gradient = 'blue-purple',
  ...props
}) => {
  const gradients = {
    'blue-purple': 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800',
    'purple-teal': 'bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600',
    'blue-green': 'bg-gradient-to-r from-blue-600 to-green-600',
    'orange-pink': 'bg-gradient-to-r from-orange-500 to-pink-500',
    'indigo-blue': 'bg-gradient-to-r from-indigo-600 to-blue-600'
  };

  return (
    <span
      className={`bg-clip-text text-transparent ${gradients[gradient]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default GradientText;