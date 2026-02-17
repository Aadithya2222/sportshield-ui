import React from 'react';

export const Button = ({ children, className, type }) => {
  return (
    <button type={type} className={`py-2 px-4 rounded-xl ${className}`}>
      {children}
    </button>
  );
};
