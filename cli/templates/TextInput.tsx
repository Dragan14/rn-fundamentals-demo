import { useRef, useState, useCallback, cloneElement } from "react";
import {
  View,
  ViewStyle,
  Text,
  TextInput as RNTextInput,
  TextStyle,
  StyleSheet,
  StyleProp,
  TextInputProps as RNTextInputProps,
  Pressable,
  PixelRatio,
  Platform,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type TextInputProps = {
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
} & RNTextInputProps;

const TextInput = ({
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
}: TextInputProps) => {
  const { theme } = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [leftIconContainerWidth, setLeftIconContainerWidth] = useState(0);

  const handleLeftIconLayout = useCallback((event: LayoutChangeEvent) => {
    setLeftIconContainerWidth(event.nativeEvent.layout.width);
  }, []);

  const colors = {
    border: disabled
      ? theme.colors.onBackgroundDisabled
      : error
        ? theme.colors.error
        : isFocused
          ? theme.colors.primary
          : variant === "solid"
            ? theme.colors.onBackgroundVariant
            : theme.colors.onBackground,
    text: disabled
      ? theme.colors.backgroundDisabled
      : variant === "solid"
        ? theme.colors.onBackgroundVariant
        : theme.colors.onBackground,
    container:
      variant === "solid"
        ? disabled
          ? theme.colors.backgroundDisabled
          : theme.colors.backgroundVariant
        : "transparent",
    topLabel: variant === "solid" ? "transparent" : theme.colors.background,
  };

  const isOutlined = variant === "outlined";
  const layout = {
    containerPadding: isOutlined || !topLabel ? 0 : scaledSize(15),
    iconMargin: isOutlined || !topLabel ? 0 : scaledSize(-14),
    labelTop: isOutlined ? scaledSize(-8) : scaledSize(4),
    labelLeft: isOutlined
      ? 9
      : leftIcon && leftIconContainerWidth > 0
        ? leftIconContainerWidth + 6
        : 6,
  };

  const renderIcon = (icon: React.ReactElement) => {
    return cloneElement(icon, {
      color: icon.props.color ?? colors.text,
      size: (icon.props.size && scaledSize(icon.props.size)) ?? scaledSize(24),
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
                backgroundColor: colors.topLabel,
                color: colors.border,
                top: layout.labelTop,
                left: layout.labelLeft,
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
            variant === "outlined"
              ? { ...styles.outlinedBorder, borderColor: colors.border }
              : { ...styles.clearBorder, borderBottomColor: colors.border },
            { backgroundColor: colors.container },
            containerStyle,
          ]}
        >
          {leftIcon && (
            <View
              style={[
                styles.leftIcon,
                {
                  marginTop: layout.iconMargin,
                  paddingTop: layout.containerPadding,
                },
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
                  color: colors.border,
                  paddingTop: layout.containerPadding,
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
              !leftLabel && { paddingTop: layout.containerPadding },
            ]}
          >
            <RNTextInput
              ref={inputRef}
              style={[styles.textInput, { color: colors.text }, textStyle]}
              placeholderTextColor={theme.colors.onBackgroundDisabled}
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
                {
                  marginTop: layout.iconMargin,
                  paddingTop: layout.containerPadding,
                },
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
                  color: colors.text,
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
};

export default TextInput;

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
