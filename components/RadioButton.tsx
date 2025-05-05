// RadioButton.tsx
import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type RadioButtonProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, "onPress">;

const RadioButton = ({
  value,
  onValueChange,
  label,
  disabled = false,
  color: initialColor,
  style,
  labelStyle,
  ...pressableProps
}: RadioButtonProps) => {
  const { theme } = useTheme();

  const color = initialColor ?? theme.colors.primary;
  const disabledColor = theme.colors.onBackgroundDisabled;
  const finalColor = disabled ? disabledColor : color;

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: value, disabled }}
      {...pressableProps}
    >
      <View style={[styles.radioOuter, { borderColor: finalColor }]}>
        {value && (
          <View style={[styles.radioInner, { backgroundColor: finalColor }]} />
        )}
      </View>
      {label && (
        <Text
          style={[
            { color: disabled ? disabledColor : theme.colors.onBackground },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

RadioButton.displayName = "RadioButton";

export default RadioButton;
