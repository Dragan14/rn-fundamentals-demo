// Switch.tsx
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
  Platform,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type SwitchProps = {
  variant?: "primary" | "secondary" | "tertiary" | "error" | "success";
} & RNSwitchProps;

const Switch = ({ variant, disabled = false, ...props }: SwitchProps) => {
  const { theme } = useTheme();

  // Calculated background color
  const onTrackColor = (() => {
    if (disabled) return theme.colors.backgroundDisabled;
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

  const offTrackColor = theme.colors.backgroundDisabled;

  // Thumb color
  const thumbColor = (() => {
    if (disabled) return theme.colors.onBackgroundDisabled;
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

  return (
    <RNSwitch
      trackColor={{ false: offTrackColor, true: onTrackColor }}
      thumbColor={thumbColor}
      ios_backgroundColor={offTrackColor}
      disabled={disabled}
      {...Platform.select({
        web: {
          activeThumbColor: thumbColor,
        },
      })}
      {...props}
    />
  );
};

Switch.displayName = "Switch";

export default Switch;
