import * as React from "react";
import type { ToastType } from "./toast.types";

export const toastStyles: Record<ToastType, React.CSSProperties> = {
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  info: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    border: '1px solid #bee5eb',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
};

export const baseStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '16px 24px',
  borderRadius: '4px',
  margin: '8px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '250px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  fontSize: '16px',
};

export const dismissButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  fontSize: '18px',
  cursor: 'pointer',
  marginLeft: '16px',
}