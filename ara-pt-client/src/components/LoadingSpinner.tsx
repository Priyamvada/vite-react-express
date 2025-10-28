import React from 'react';
import { Icons } from '../assets';

const spinnerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
};

export const LoadingSpinner: React.FC = () => (
  <div style={spinnerStyle}>
    <img src={Icons.loadingSpinner} alt="Loading..." />
  </div>
);