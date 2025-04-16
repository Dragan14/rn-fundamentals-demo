// Button.tsx
import {
  useState,
  cloneElement,
  forwardRef,
  ForwardedRef,
  ReactElement,
} from "react";
import {
  Pressable,
  PressableProps,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  PixelRatio,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

// Button props type
type ButtonProps = {
  children?: string;
  color?: string;
  textColor?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  round?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outlined"
    | "success"
    | "error"
    | "elevated";
} & PressableProps;

// Helper function to scale sizes based on font size
const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

// Helper function to render icons
const renderIcon = (icon: ReactElement, color: string) => {
  return cloneElement(icon, {
    color: icon.props.color ?? color,
    size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
  });
};

// Button component
const Button = forwardRef(
  (
    {
      children,
      color: initialColor,
      textColor: initialTextColor,
      leftIcon,
      rightIcon,
      loading = false,
      style,
      contentContainerStyle,
      textContainerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      textStyle,
      disabled,
      round = false,
      variant,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<View>,
  ) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    // Calculated background color
    const color = (() => {
      if (disabled) return theme.colors.backgroundDisabled;
      if (initialColor) return initialColor;
      switch (variant) {
        case "success":
          return theme.colors.success;
        case "error":
          return theme.colors.error;
        case "outlined":
          return "transparent";
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.secondary;
        case "tertiary":
          return theme.colors.tertiary;
        case "elevated":
          return theme.colors.elevated;
        default:
          return theme.colors.primary;
      }
    })();

    // Calculated text color
    const textColor = (() => {
      if (disabled) return theme.colors.onBackgroundDisabled;
      if (initialTextColor) return initialTextColor;
      switch (variant) {
        case "success":
          return theme.colors.onSuccess;
        case "error":
          return theme.colors.onError;
        case "outlined":
          return theme.colors.primary;
        case "primary":
          return theme.colors.onPrimary;
        case "secondary":
          return theme.colors.onSecondary;
        case "tertiary":
          return theme.colors.onTertiary;
        case "elevated":
          return theme.colors.primary;
        default:
          return theme.colors.onPrimary;
      }
    })();

    const borderRadius = round ? 20 : 5;
    const borderColor = theme.colors.primary;

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: color },
          { borderRadius: borderRadius },
          variant === "outlined" && {
            borderWidth: 1,
            borderColor: borderColor,
          },
          !disabled && isHovered && styles.hovered,
          !disabled && pressed && styles.pressed,
          style,
        ]}
        disabled={disabled}
        onHoverIn={() => {
          if (!disabled) {
            setIsHovered(true);
          }
        }}
        onHoverOut={() => {
          setIsHovered(false);
        }}
        {...props}
      >
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {loading ? (
            <ActivityIndicator size="small" color={textColor} />
          ) : (
            <>
              {leftIcon && (
                <View style={leftIconContainerStyle} pointerEvents="none">
                  {renderIcon(leftIcon, textColor)}
                </View>
              )}
              {children && (
                <View
                  style={[
                    styles.textContainer,
                    textContainerStyle,
                    !leftIcon && !rightIcon && { flex: 1 },
                  ]}
                >
                  <Text style={[styles.text, { color: textColor }, textStyle]}>
                    {children}
                  </Text>
                </View>
              )}
              {rightIcon && (
                <View style={rightIconContainerStyle} pointerEvents="none">
                  {renderIcon(rightIcon, textColor)}
                </View>
              )}
            </>
          )}
        </View>
      </Pressable>
    );
  },
);

Button.displayName = "Button";

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  hovered: {
    opacity: 0.9,
  },
  pressed: {
    opacity: 0.8,
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
  },
});
