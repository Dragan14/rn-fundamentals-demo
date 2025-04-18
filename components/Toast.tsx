import { ReactElement, cloneElement } from "react";
import {
  Text,
  Pressable,
  PixelRatio,
  StyleSheet,
  Platform,
  View,
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
  const {
    isVisible,
    message,
    leftIcon,
    rightIcon,
    hideToast,
    position,
    containerStyle,
    contentContainerStyle,
    leftIconContainerStyle,
    textContainerStyle,
    textStyle,
    rightIconContainerStyle,
  } = useToast();

  if (!isVisible) {
    return null;
  }

  const offset = Platform.OS === "web" ? 20 : 0;
  const basePositionStyle =
    position === "top"
      ? { top: insets.top + offset }
      : { bottom: insets.bottom + offset };

  const enteringAnimation =
    position === "top" ? SlideInUp.duration(500) : SlideInDown.duration(500);
  const exitingAnimation =
    position === "top" ? SlideOutUp.duration(500) : SlideOutDown.duration(500);

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
        containerStyle,
      ]}
    >
      <Pressable
        style={[styles.pressableContent, contentContainerStyle]}
        onPress={hideToast}
      >
        <View style={leftIconContainerStyle}>
          {leftIcon && renderIcon(leftIcon, theme.colors.onPrimary)}
        </View>
        <View
          style={[
            styles.textContainer,
            textContainerStyle,
            !leftIcon && !rightIcon && { flex: 1 },
          ]}
        >
          {message != null && (
            <Text
              style={[
                styles.text,
                { color: theme.colors.onPrimary },
                textStyle,
              ]}
            >
              {message}
            </Text>
          )}
        </View>
        <View style={rightIconContainerStyle}>
          {rightIcon && renderIcon(rightIcon, theme.colors.onPrimary)}
        </View>
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
  textContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 5,
  },
});

Toast.displayName = "Toast";

export default Toast;
