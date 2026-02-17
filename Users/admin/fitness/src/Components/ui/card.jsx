import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white p-6 shadow-xl rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};
