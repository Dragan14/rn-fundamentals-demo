import { useRef, useState, useCallback, cloneElement } from "react";
import {
  View,
  ViewStyle,
  Text,
  TextInput,
  TextStyle,
  StyleSheet,
  StyleProp,
  TextInputProps,
  Pressable,
  PixelRatio,
  Platform,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type MyTextInputProps = {
  topLabel?: string;
  leftLabel?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  error?: boolean;
  errorMessage?: string;
  retainErrorMessageSpace?: boolean;
  variant?: "clear" | "outlined" | "solid";
  counter?: boolean;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  topLabelStyle?: StyleProp<TextStyle>;
  leftLabelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconStyle?: StyleProp<ViewStyle>;
  rightIconStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
} & TextInputProps;

export default function MyTextInput({
  topLabel,
  leftLabel,
  leftIcon,
  rightIcon,
  error,
  errorMessage,
  retainErrorMessageSpace = true,
  variant = "outlined",
  counter,
  maxLength,
  style,
  textStyle,
  topLabelStyle,
  leftLabelStyle,
  containerStyle,
  leftIconStyle,
  rightIconStyle,
  disabled,
  value,
  onBlur,
  onFocus,
  ...props
}: MyTextInputProps) {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [leftIconContainerWidth, setLeftIconContainerWidth] = useState(0);

  const handleLeftIconLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      if (width !== leftIconContainerWidth) {
        setLeftIconContainerWidth(width);
      }
    },
    [leftIconContainerWidth],
  );

  // Determine base text/label/icon colors based on variant
  const borderColor = disabled
    ? theme.colors.onSurfaceDisabled
    : error
      ? theme.colors.error
      : isFocused
        ? theme.colors.primary
        : variant === "solid"
          ? theme.colors.onSurfaceVariant
          : theme.colors.onBackground;
  const baseTextColor = disabled
    ? theme.colors.onSurfaceDisabled
    : variant === "solid"
      ? theme.colors.onSurfaceVariant
      : theme.colors.onBackground;
  const containerBackgroundColor =
    variant === "solid"
      ? disabled
        ? theme.colors.surfaceDisabled
        : theme.colors.surfaceVariant
      : "transparent";
  const topLabelBackgroundColor =
    variant === "solid" ? "transparent" : theme.colors.background;

  // Container border style based on variant
  const containerBorder =
    variant === "outlined"
      ? {
          ...styles.outlinedBorder,
          borderColor,
        }
      : {
          // clear and solid variants only have bottom border
          ...styles.clearBorder,
          borderBottomColor: borderColor,
        };

  // Adjust padding and icon positions based on variant
  const isOutlined = variant === "outlined";
  const containerPaddingTop = isOutlined || !topLabel ? 0 : scaledSize(15);
  const iconMarginTop = isOutlined || !topLabel ? 0 : scaledSize(-14);
  const topLabelTop = isOutlined ? scaledSize(-8) : scaledSize(4);
  const topLabelLeft = isOutlined
    ? 9
    : leftIcon && leftIconContainerWidth > 0
      ? leftIconContainerWidth + 6
      : 6;

  // Update the renderIcon logic to handle React elements
  const renderIcon = (icon: React.ReactElement) => {
    console.log("Rendering icon:", icon);
    return cloneElement(icon, {
      color: icon.props.color ?? baseTextColor,
    });
  };

  return (
    <View style={style}>
      <Pressable
        onPress={() => {
          if (!disabled) {
            inputRef.current?.focus();
          }
        }}
        disabled={disabled}
      >
        {topLabel && (
          <Text
            style={[
              styles.topLabel,
              {
                backgroundColor: topLabelBackgroundColor,
                color: borderColor,
                top: topLabelTop,
                left: topLabelLeft,
              },
              topLabelStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {topLabel}
          </Text>
        )}
        <View
          style={[
            styles.container,
            containerBorder,
            {
              backgroundColor: containerBackgroundColor,
            },
            containerStyle,
          ]}
        >
          {leftIcon && (
            <View
              style={[
                styles.leftIcon,
                { marginTop: iconMarginTop, paddingTop: containerPaddingTop },
                leftIconStyle,
              ]}
              onLayout={handleLeftIconLayout}
            >
              {renderIcon(leftIcon)}
            </View>
          )}
          {leftLabel && (
            <Text
              style={[
                styles.leftLabel,
                {
                  backgroundColor: "transparent",
                  color: borderColor,
                  paddingTop: containerPaddingTop,
                },
                leftLabelStyle,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {leftLabel}
            </Text>
          )}
          <View
            style={[
              styles.textInputContainer,
              !leftLabel && { paddingTop: containerPaddingTop },
            ]}
          >
            <TextInput
              ref={inputRef}
              style={[styles.textInput, { color: baseTextColor }, textStyle]}
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
              }}
              editable={!disabled}
              maxLength={maxLength}
              value={value}
              {...props}
            />
          </View>
          {rightIcon && (
            <View
              style={[
                styles.rightIcon,
                { marginTop: iconMarginTop, paddingTop: containerPaddingTop },
                rightIconStyle,
              ]}
            >
              {renderIcon(rightIcon)}
            </View>
          )}
        </View>
      </Pressable>
      {((error && errorMessage && !disabled) ||
        (counter && !disabled) ||
        retainErrorMessageSpace) && (
        <View style={styles.bottomContainer}>
          {error && errorMessage ? (
            <Text
              style={[
                styles.errorMessage,
                {
                  color: theme.colors.error,
                },
              ]}
            >
              {errorMessage}
            </Text>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {counter && !disabled && (
            <Text
              style={[
                styles.counter,
                {
                  color: baseTextColor,
                },
              ]}
            >
              {maxLength
                ? `${value?.length ?? 0}/${maxLength}`
                : `${value?.length ?? 0}`}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};

const styles = StyleSheet.create({
  container: {
    minHeight: scaledSize(50),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textInputContainer: {
    flex: 1,
    marginVertical: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 13,
    minHeight: scaledSize(16),
  },
  errorMessage: {
    fontSize: 12,
    textAlign: "left",
    flex: 1,
  },
  counter: {
    fontSize: 12,
    textAlign: "right",
    marginLeft: 5,
  },
  topLabel: {
    position: "absolute",
    paddingHorizontal: 4,
    fontWeight: "bold",
    fontSize: 12,
    zIndex: 1,
  },
  leftLabel: {
    fontWeight: "bold",
    paddingRight: 8,
  },
  leftIcon: {
    flexDirection: "row",
    paddingRight: 8,
  },
  rightIcon: {
    flexDirection: "row",
    paddingLeft: 8,
  },
  textInput: {
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlignVertical: "top",
  },
  outlinedBorder: {
    borderRadius: 5,
    borderWidth: 1,
  },
  clearBorder: {
    borderBottomWidth: 1,
  },
});
