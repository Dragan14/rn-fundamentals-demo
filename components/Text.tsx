import { useState, forwardRef, ForwardedRef } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
  Pressable,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type TextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success";
  color?: string;
  link?: boolean;
  disabled?: boolean;
} & RNTextProps;

const Text = forwardRef(
  (
    {
      children,
      style,
      variant,
      color,
      link,
      disabled,
      onPress,
      ...props
    }: TextProps,
    ref: ForwardedRef<RNText>,
  ) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    color = (() => {
      if (color) return color;
      switch (variant) {
        case "default":
          return theme.colors.onBackground;
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.secondary;
        case "tertiary":
          return theme.colors.tertiary;
        case "error":
          return theme.colors.error;
        case "success":
          return theme.colors.success;
        default:
          return theme.colors.onSurface;
      }
    })();

    return link ? (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onHoverIn={() => {
          if (!disabled) {
            setIsHovered(true);
          }
        }}
        onHoverOut={() => {
          setIsHovered(false);
        }}
      >
        {({ pressed }) => (
          <RNText
            disabled={disabled}
            ref={ref}
            style={[
              { color: color },
              pressed || isHovered ? { textDecorationLine: "underline" } : {},
              style,
            ]}
            {...props}
          >
            {children}
          </RNText>
        )}
      </Pressable>
    ) : (
      <RNText ref={ref} style={[{ color: color }, style]} {...props}>
        {children}
      </RNText>
    );
  },
);

Text.displayName = "Text";

export default Text;
