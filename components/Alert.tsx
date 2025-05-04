// Alert.tsx
import { ReactNode } from "react";
import {
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  View,
  Platform,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

export type AlertProps = {
  visible: boolean;
  onDismiss: () => void;
  children?: ReactNode;
  style: StyleProp<ViewStyle>;
  dismissOnBackdropPress?: boolean;
};

const Alert = ({
  visible,
  onDismiss,
  children,
  style,
  dismissOnBackdropPress = false,
}: AlertProps) => {
  const { theme } = useTheme();

  return (
    <Modal
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
            styles.alertContainer,
            { backgroundColor: theme.colors.background },
            style,
          ]}
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    ...(Platform.OS === "web" ? { width: "100%" } : { alignSelf: "stretch" }),
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

Alert.displayName = "Alert";

export default Alert;
