import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
