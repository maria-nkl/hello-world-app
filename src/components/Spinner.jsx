import React from 'react';
import './Spinner.css'; // Опционально для кастомных стилей

const Spinner = ({ size = 'md', variant = 'primary' }) => {
  const sizeClass = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg'
  }[size];

  return (
    <div className={`spinner-border text-${variant} ${sizeClass}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;