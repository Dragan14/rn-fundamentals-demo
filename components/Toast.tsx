import { ReactElement, cloneElement } from "react";
import {
  Text,
  Pressable,
  PixelRatio,
  StyleSheet,
  Platform,
} from "react-native";
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
  const { isVisible, message, leftIcon, rightIcon, hideToast, position } =
    useToast();

  if (!isVisible) {
    return null;
  }

  const webOffset = Platform.OS === "web" ? 20 : 0;
  const positionStyle =
    position === "top"
      ? { top: insets.top + webOffset }
      : { bottom: insets.bottom + webOffset };

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.elevatedPrimary,
          shadowColor: "rbg(0,0,0)",
        },
        positionStyle,
      ]}
      onPress={hideToast}
    >
      {leftIcon && renderIcon(leftIcon, theme.colors.primary)}
      {message != null && (
        <Text style={[styles.text, { color: theme.colors.primary }]}>
          {message}
        </Text>
      )}
      {rightIcon && renderIcon(rightIcon, theme.colors.primary)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  text: {
    marginHorizontal: 5,
  },
});

Toast.displayName = "Toast";

export default Toast;
