import { ReactElement, cloneElement } from "react";
import { Text, Pressable, PixelRatio } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

const renderIcon = (icon: ReactElement, color: string) => {
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
  });
};

const Toast = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { isVisible, message, leftIcon, rightIcon, hideToast } = useToast();

  if (!isVisible) {
    return null;
  }

  return (
    <Pressable
      style={{
        position: "absolute",
        bottom: insets.bottom,
        left: 20,
        right: 20,
        backgroundColor: theme.colors.elevatedPrimary,
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
      }}
      onPress={hideToast}
    >
      {leftIcon && renderIcon(leftIcon, theme.colors.primary)}
      {message != null && (
        <Text style={{ color: theme.colors.primary, marginHorizontal: 5 }}>
          {message}
        </Text>
      )}
      {rightIcon && renderIcon(rightIcon, theme.colors.primary)}
    </Pressable>
  );
};

Toast.displayName = "Toast";

export default Toast;
