// Toast.tsx
import { ReactElement, cloneElement } from "react";
import {
  Text,
  Pressable,
  PixelRatio,
  StyleSheet,
  Platform,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import Animated, {
  runOnJS,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type ToastProps = {
  message: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  position?: "top" | "bottom";
  contentContainerStyle?: StyleProp<ViewStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  elevated?: boolean;
  outlined?: boolean;
  color?: string;
  textColor?: string;
  variant?: "primary" | "secondary" | "tertiary" | "success" | "error";
  onDismiss?: () => void;
} & PressableProps;

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

const renderIcon = (icon: ReactElement, color: string) => {
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
  });
};

const Toast = ({
  message,
  leftIcon,
  rightIcon,
  position = "bottom",
  contentContainerStyle,
  leftIconContainerStyle,
  style,
  textContainerStyle,
  textStyle,
  rightIconContainerStyle,
  elevated = false,
  outlined = false,
  color: initialColor,
  textColor: initialTextColor,
  variant = "primary",
  onDismiss,
  ...pressableProps
}: ToastProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const offset = Platform.OS === "web" ? 20 : 0;
  const basePositionStyle =
    position === "top"
      ? { top: insets.top + offset }
      : { bottom: insets.bottom + offset };

  const enteringAnimation =
    position === "top" ? SlideInUp.duration(500) : SlideInDown.duration(500);
  const exitingAnimation =
    position === "top" ? SlideOutUp.duration(500) : SlideOutDown.duration(500);

  // Calculated background color
  const color = (() => {
    if (initialColor) return initialColor;
    if (outlined && !elevated) return theme.colors.background;
    if (!elevated) {
      switch (variant) {
        case "success":
          return theme.colors.success;
        case "error":
          return theme.colors.error;
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.secondary;
        case "tertiary":
          return theme.colors.tertiary;
        default:
          return theme.colors.primary;
      }
    } else {
      switch (variant) {
        case "success":
          return theme.colors.elevatedSuccess;
        case "error":
          return theme.colors.elevatedError;
        case "primary":
          return theme.colors.elevatedPrimary;
        case "secondary":
          return theme.colors.elevatedSecondary;
        case "tertiary":
          return theme.colors.elevatedTertiary;
        default:
          return theme.colors.elevatedPrimary;
      }
    }
  })();

  // Calculated text color
  const textColor = (() => {
    if (initialTextColor) return initialTextColor;
    if (outlined || elevated) {
      switch (variant) {
        case "success":
          return theme.colors.success;
        case "error":
          return theme.colors.error;
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.secondary;
        case "tertiary":
          return theme.colors.tertiary;
        default:
          return theme.colors.primary;
      }
    }
    switch (variant) {
      case "success":
        return theme.colors.onSuccess;
      case "error":
        return theme.colors.onError;
      case "primary":
        return theme.colors.onPrimary;
      case "secondary":
        return theme.colors.onSecondary;
      case "tertiary":
        return theme.colors.onTertiary;
      default:
        return theme.colors.onPrimary;
    }
  })();

  const borderColor = (() => {
    switch (variant) {
      case "success":
        return theme.colors.success;
      case "error":
        return theme.colors.error;
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.secondary;
      case "tertiary":
        return theme.colors.tertiary;
      default:
        return theme.colors.primary;
    }
  })();

  // Gesture handling for dismissing the toast
  const panGesture = Gesture.Pan().onEnd((event) => {
    const threshold = 5;
    if (position === "top" && event.translationY < -threshold && onDismiss) {
      runOnJS(onDismiss)();
    } else if (
      position === "bottom" &&
      event.translationY > threshold &&
      onDismiss
    ) {
      runOnJS(onDismiss)();
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        entering={enteringAnimation}
        exiting={exitingAnimation}
        style={[
          styles.container,
          { shadowColor: "black" },
          { backgroundColor: color },
          { borderRadius: 5 },
          outlined && {
            borderWidth: 1,
            borderColor: borderColor,
          },
          basePositionStyle,
          style,
        ]}
      >
        <Pressable
          style={[styles.pressableContent, contentContainerStyle]}
          {...pressableProps}
        >
          {leftIcon && (
            <View style={leftIconContainerStyle}>
              {renderIcon(leftIcon, textColor)}
            </View>
          )}
          <View
            style={[
              styles.textContainer,
              textContainerStyle,
              !leftIcon && !rightIcon && { flex: 1 },
            ]}
          >
            {message != null && (
              <Text style={[styles.text, { color: textColor }, textStyle]}>
                {message}
              </Text>
            )}
          </View>
          {rightIcon && (
            <View style={rightIconContainerStyle}>
              {renderIcon(rightIcon, textColor)}
            </View>
          )}
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  pressableContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  text: {
    textAlign: "center",
    flexWrap: "wrap",
    ...Platform.select({
      web: {
        wordBreak: "break-word",
      },
    }),
  },
});

Toast.displayName = "Toast";

export default Toast;
