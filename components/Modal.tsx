// Modal.tsx
import { ReactNode } from "react";
import {
  Modal as RNModal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  View,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

export type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  children?: ReactNode;
  style: StyleProp<ViewStyle>;
  dismissOnBackdropPress?: boolean;
};

const Modal = ({
  visible,
  onDismiss,
  children,
  style,
  dismissOnBackdropPress = false,
}: ModalProps) => {
  const { theme } = useTheme();

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <Pressable
        style={styles.backdrop}
        onPress={dismissOnBackdropPress ? onDismiss : undefined}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
            style,
          ]}
        >
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    maxWidth: 500,
    maxHeight: "80%",
    borderRadius: 5,
    padding: 20,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
});

Modal.displayName = "Modal";

export default Modal;
