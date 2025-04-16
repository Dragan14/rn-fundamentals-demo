// SafeAreaView.tsx
/*
Reimplemented SafeAreaView due to issues with react-native-safe-area-context
https://github.com/AppAndFlow/react-native-safe-area-context/issues/114
*/
import { ReactNode } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

type SafeAreaViewProps = {
  disableBottomSafeArea?: boolean;
  disableTopSafeArea?: boolean;
  disableSidesSafeArea?: boolean;
  children: ReactNode;
  style?: ViewStyle;
} & ViewStyle;

const SafeAreaView = ({
  disableBottomSafeArea,
  disableTopSafeArea,
  disableSidesSafeArea,
  children,
  style,
  ...props
}: SafeAreaViewProps) => {
  const { theme } = useTheme();

  const insets = useSafeAreaInsets();

  const backgroundColor = theme.colors.background;
  const safeAreaStyle: ViewStyle = {};

  if (!disableBottomSafeArea) {
    safeAreaStyle.paddingBottom = insets.bottom;
  }

  if (!disableTopSafeArea) {
    safeAreaStyle.paddingTop = insets.top;
  }

  if (!disableSidesSafeArea) {
    safeAreaStyle.paddingRight = insets.right;
    safeAreaStyle.paddingLeft = insets.left;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
        safeAreaStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaView;
