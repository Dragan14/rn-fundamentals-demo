import { useColorScheme } from "react-native";
import { createContext, useContext, useEffect, useMemo } from "react";
import { blueLight, blueDark } from "@/themes/blue-theme";
import { purpleLight, purpleDark } from "@/themes/purple-theme";

type ThemeType = typeof blueLight;

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: blueLight,
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const theme = useMemo(() => (isDark ? blueDark : blueLight), [isDark]);

  useEffect(() => {}, [colorScheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      isDark,
    }),
    [theme, isDark],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
