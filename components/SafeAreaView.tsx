/*
Reimplemented SafeAreaView due to issues with react-native-safe-area-context
https://github.com/AppAndFlow/react-native-safe-area-context/issues/114
*/
import { ReactNode, FunctionComponent } from "react";
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

  style = StyleSheet.flatten([
    { flex: 1, backgroundColor: theme.colors.background },
    style,
  ]);

  if (!disableBottomSafeArea) {
    style.paddingBottom = insets.bottom;
  }

  if (!disableTopSafeArea) {
    style.paddingTop = insets.top;
  }

  if (!disableSidesSafeArea) {
    style.paddingRight = insets.right;
    style.paddingLeft = insets.left;
  }

  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
};

export default SafeAreaView;
