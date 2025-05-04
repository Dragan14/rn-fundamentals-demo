import React, { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/Modal";
import { StyleProp, ViewStyle } from "react-native";

interface ModalOptions {
  style?: StyleProp<ViewStyle>;
}

interface ModalContextType {
  showModal: (content: ReactNode, options?: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({});

  const showModal = (content: ReactNode, options: ModalOptions = {}) => {
    setModalContent(content);
    setModalOptions(options);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        visible={isVisible}
        onDismiss={hideModal}
        style={modalOptions.style}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
