import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "@/components/Alert";
import { StyleProp, ViewStyle } from "react-native";

interface AlertOptions {
  style?: StyleProp<ViewStyle>;
  dismissOnBackdropPress?: boolean;
}

interface AlertContextType {
  showAlert: (content: ReactNode, options?: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [alertContent, setAlertContent] = useState<ReactNode>(null);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({});

  const showAlert = (content: ReactNode, options: AlertOptions = {}) => {
    setAlertContent(content);
    setAlertOptions(options);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert
        visible={isVisible}
        onDismiss={hideAlert}
        style={alertOptions.style}
        dismissOnBackdropPress={alertOptions.dismissOnBackdropPress}
      >
        {alertContent}
      </Alert>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
