/**
 * Toast types
 */
export type ToastType = 'success' | 'info' | 'error';

/**
 * Props for the Toast component
 */
export interface ToastProps {
  /**
   * The message to display in the toast
   */
  message: string;

  /**
   * The type of toast (default: 'info'). Determines styling.
   */
  type?: ToastType;

  /**
   * Optional callback when the toast is dismissed/closed. If not provided, no close button is shown.
   * @returns callback function
   */
  onClose?: () => void;
}