import { Children, Fragment, cloneElement, isValidElement } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  PixelRatio,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

const renderElementWithColor = (
  element: React.ReactElement,
  color: string,
): React.ReactElement => {
  if (element.type === Fragment) {
    const children = Children.map(element.props.children, (child) =>
      isValidElement(child) ? renderElementWithColor(child, color) : child,
    );
    return (
      <View
        style={{
          gap: 5,
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    );
  } else if (element.type === Text) {
    const originalStyle = StyleSheet.flatten(element.props.style) || {};
    return cloneElement(element, {
      style: [originalStyle, { color: color }] as StyleProp<TextStyle>,
    });
  } else {
    return cloneElement(element, {
      color: element.props.color ?? color,
      size:
        (element.props.size && scaledSize(element.props.size)) ??
        scaledSize(24),
    });
  }
};

interface SegmentedControlProps {
  values: React.ReactElement[];
  selectedIndices: number[];
  onTabPress: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  inactiveTabStyle?: StyleProp<ViewStyle>;
  round?: boolean;
  disabled?: boolean;
}

export const SegmentedControl = ({
  values,
  selectedIndices,
  onTabPress,
  style,
  tabStyle,
  activeTabStyle,
  inactiveTabStyle,
  round = false,
  disabled = false,
}: SegmentedControlProps) => {
  const { theme } = useTheme();

  const borderRadius =
    StyleSheet.flatten(style)?.borderRadius ?? (round ? 20 : 5);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: borderRadius,
      backgroundColor: theme.colors.background,
      opacity: disabled ? 0.5 : 1,
    },
    tabBase: {
      flex: 1,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRightWidth: 0,
    },
    tabInactive: {
      backgroundColor: theme.colors.background,
    },
    tabActive: {
      backgroundColor: theme.colors.secondaryContainer,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {values.map((valueElement, index) => {
        const isSelected = selectedIndices.includes(index);
        const isLastTab = index === values.length - 1;

        const currentTabBackgroundStyle = isSelected
          ? [styles.tabActive, activeTabStyle]
          : [styles.tabInactive, inactiveTabStyle];

        const tabBorderStyle = {
          borderRightWidth: isLastTab ? 1 : 0,
          borderTopLeftRadius: index === 0 ? borderRadius : 0,
          borderBottomLeftRadius: index === 0 ? borderRadius : 0,
          borderTopRightRadius: isLastTab ? borderRadius : 0,
          borderBottomRightRadius: isLastTab ? borderRadius : 0,
        };

        const contentColor = isSelected
          ? theme.colors.onSecondaryContainer
          : theme.colors.onBackground;

        const renderedContent = renderElementWithColor(
          valueElement,
          contentColor,
        );

        return (
          <Pressable
            key={index}
            onPress={() => onTabPress(index)}
            style={[
              styles.tabBase,
              tabStyle,
              tabBorderStyle,
              currentTabBackgroundStyle,
            ]}
            disabled={disabled}
          >
            {renderedContent}
          </Pressable>
        );
      })}
    </View>
  );
};

const scaledSize = (baseSize: number) => {
  return Math.round(baseSize * PixelRatio.getFontScale());
};
