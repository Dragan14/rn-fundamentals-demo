import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";

interface ToastOptions {
  message: string;
  duration?: number;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
  isVisible: boolean;
  message: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [leftIcon, setLeftIcon] = useState<ReactElement | undefined>(undefined);
  const [rightIcon, setRightIcon] = useState<ReactElement | undefined>(
    undefined,
  );
  const [duration, setDuration] = useState(3000);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const showToast = ({
    message,
    duration = 3000,
    leftIcon,
    rightIcon,
  }: ToastOptions) => {
    setMessage(message);
    setDuration(duration);
    setLeftIcon(leftIcon);
    setRightIcon(rightIcon);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
    setTimeout(() => {
      setMessage("");
      setLeftIcon(undefined);
      setRightIcon(undefined);
    }, 500);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        isVisible,
        message,
        leftIcon,
        rightIcon,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
