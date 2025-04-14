import { useState, cloneElement, forwardRef, ForwardedRef } from "react";
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

type ButtonProps = {
  children?: string;
  color?: string;
  textColor?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
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

const Button = forwardRef(
  (
    {
      children,
      color,
      textColor,
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

    color = (() => {
      if (disabled) return theme.colors.surfaceDisabled;
      if (color) return color;
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
          return theme.colors.elevation.level5;
        default:
          return theme.colors.primary;
      }
    })();

    textColor = (() => {
      if (disabled) return theme.colors.onSurfaceDisabled;
      if (textColor) return textColor;
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

    const renderIcon = (icon: React.ReactElement) => {
      return cloneElement(icon, {
        color: icon.props.color ?? textColor,
        size:
          (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
      });
    };

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: color },
          { borderRadius: borderRadius },
          variant === "outlined" && {
            borderWidth: 1,
            borderColor: theme.colors.outline,
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
                  {renderIcon(leftIcon)}
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
                  {renderIcon(rightIcon)}
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

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

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
