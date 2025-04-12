import { ComponentProps } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useTheme } from "@/context/ThemeContext";

type SegmentedControlProps = {
  round?: boolean;
} & ComponentProps<typeof SegmentedControlTab>;

const SegmentedControl = ({
  selectedIndex = 0,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  borderRadius,
  round = false,
  enabled = true,
  ...props
}: SegmentedControlProps) => {
  const { theme } = useTheme();

  return (
    <SegmentedControlTab
      selectedIndex={selectedIndex}
      enabled={enabled}
      tabStyle={[
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.outline,
        },
        tabStyle,
      ]}
      activeTabStyle={[
        { backgroundColor: theme.colors.secondaryContainer },
        activeTabStyle,
      ]}
      tabTextStyle={[
        {
          color: theme.colors.onBackground,
          fontWeight: "500",
          marginVertical: "auto",
        },
        tabTextStyle,
      ]}
      activeTabTextStyle={[
        { color: theme.colors.onSecondaryContainer },
        activeTabTextStyle,
      ]}
      borderRadius={borderRadius ?? (round ? 20 : 5)}
      {...props}
    />
  );
};

export default SegmentedControl;
