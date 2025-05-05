import { useColorScheme } from "react-native";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { blueLight, blueDark } from "../themes/blue-theme";

type ThemeType = typeof blueLight;
type ThemeMode = "light" | "dark" | "system";

/**
 * Defines the shape of the Theme context.
 */
interface ThemeContextType {
  /** The current theme object containing color definitions. */
  theme: ThemeType;
  /** Boolean indicating if the current theme is dark. */
  isDark: boolean;
  /** The currently selected theme mode ('light', 'dark', or 'system'). */
  themeMode: ThemeMode;
  /** Function to set the desired theme mode. */
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: blueLight,
  isDark: false,
  themeMode: "system",
  setThemeMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return systemColorScheme === "dark";
    }
    return themeMode === "dark";
  }, [themeMode, systemColorScheme]);

  const theme = useMemo(() => (isDark ? blueDark : blueLight), [isDark]);

  const contextValue = useMemo(
    () => ({
      theme,
      isDark,
      themeMode,
      setThemeMode,
    }),
    [theme, isDark, themeMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
