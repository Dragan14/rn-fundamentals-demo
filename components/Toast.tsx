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
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";

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

  const offset = Platform.OS === "web" ? 20 : 0;
  const basePositionStyle =
    position === "top"
      ? { top: insets.top + offset }
      : { bottom: insets.bottom + offset };

  if (!isVisible) {
    return null;
  }

  const enteringAnimation = position === "top" ? SlideInUp : SlideInDown;
  const exitingAnimation = position === "top" ? SlideOutUp : SlideOutDown;

  return (
    <Animated.View
      entering={enteringAnimation}
      exiting={exitingAnimation}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary,
          shadowColor: "rgb(0,0,0)",
        },
        basePositionStyle,
      ]}
    >
      <Pressable style={styles.pressableContent} onPress={hideToast}>
        {leftIcon && renderIcon(leftIcon, theme.colors.onPrimary)}
        {message != null && (
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>
            {message}
          </Text>
        )}
        {rightIcon && renderIcon(rightIcon, theme.colors.onPrimary)}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  pressableContent: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    marginHorizontal: 5,
  },
});

Toast.displayName = "Toast";

export default Toast;
