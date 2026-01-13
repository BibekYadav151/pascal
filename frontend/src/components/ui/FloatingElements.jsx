import React from 'react';

const FloatingElements = ({ count = 5, className = '' }) => {
  const elements = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;