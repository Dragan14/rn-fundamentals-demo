import React, { createContext, useContext, useState, useRef } from "react";
import Toast, { ToastProps } from "@/components/Toast";

interface ToastItem {
  id: number;
  props: ToastProps;
}

interface ToastContextType {
  showToast: (props: ToastProps, duration?: number) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentToast, setCurrentToast] = useState<ToastItem | null>(null);
  const nextIdRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (props: ToastProps, duration: number = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const id = nextIdRef.current++;
    setCurrentToast({ id, props });
    if (duration) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  };

  const hideToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCurrentToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {currentToast && <Toast key={currentToast.id} {...currentToast.props} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
