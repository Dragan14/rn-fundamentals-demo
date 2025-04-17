import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
  useEffect,
} from "react";

type ToastPosition = "top" | "bottom";

interface ToastOptions {
  message: string;
  duration?: number;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  position?: ToastPosition;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
  isVisible: boolean;
  message: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  position: ToastPosition;
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
  const [position, setPosition] = useState<ToastPosition>("bottom");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        hideToast();
      }, duration);
    }
  }, [isVisible, duration]);

  const showToast = ({
    message,
    duration = 3000,
    leftIcon,
    rightIcon,
    position = "bottom",
  }: ToastOptions) => {
    setMessage(message);
    setDuration(duration);
    setLeftIcon(leftIcon);
    setRightIcon(rightIcon);
    setPosition(position);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
    setMessage("");
    setLeftIcon(undefined);
    setRightIcon(undefined);
    setPosition("bottom");
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
        position,
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
