"use client";

import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import type { Dict } from "@chakra-ui/utils";
import { createContext, useContext, useState } from "react";

import themeDark from "@/themes/dark";
import themeLight from "@/themes/light";

interface IProps {
  children: React.ReactNode;
  cookies: string;
}

interface Layouts {
  light: JSX.Element;
  dark: JSX.Element;
}

interface IUseTheme {
  theme: string;
  setTheme: (value: THEME) => void;
  getCurrentTheme: Dict | undefined | void;
  getCurrentLayout: ({ dark, light }: Partial<Layouts>) => JSX.Element;
}

export enum THEME {
  Light = "Light",
  Dark = "Dark",
}

const defaultTheme = THEME.Dark;

interface IThemes {
  theme: string;
  setTheme: (value: THEME) => void;
  getCurrentTheme: () => Dict | undefined | void;
  getCurrentLayout: ({ dark, light }: Partial<Layouts>) => JSX.Element;
}

const ThemeContext = createContext<IThemes>({
  theme: defaultTheme,
  setTheme: () => {
    return;
  },
  getCurrentLayout() {
    return <></>; // eslint-disable-line react/jsx-no-useless-fragment
  },
  getCurrentTheme() {},
});

export function parseCookie(cookie: string, key: string): string {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  return match?.[2] as string;
}
const getThemeValue = (t: string): THEME => {
  const initTheme = process.env.ONLY_THEME || t;
  if (Object.values(THEME).includes(initTheme as THEME)) {
    return initTheme as THEME;
  }
  return defaultTheme;
};

const BlastThemeProvider = ({
  children,
  cookies,
}: IProps): React.ReactElement => {
  const [theme, setThemeState] = useState<THEME>(
    getThemeValue(parseCookie(cookies ?? "", "blastTheme")),
  );
  const setTheme = (value: THEME): void => {
    const val = getThemeValue(value);
    setThemeState(val);
    document.cookie = `${"blastTheme"}=${val}; max-age=31536000; path=/`;
  };

  const getCurrentTheme = (): Dict | undefined => {
    if (theme === THEME.Dark) return themeDark;
    else if (theme === THEME.Light) return themeLight;
    return undefined;
  };

  const getCurrentLayout = ({ dark, light }: Partial<Layouts>): JSX.Element => {
    if (dark && theme === THEME.Dark) return dark;
    else if (light && theme === THEME.Light) return light;

    return <></>; // eslint-disable-line react/jsx-no-useless-fragment
  };

  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ThemeContext.Provider
      value={{ setTheme, theme, getCurrentLayout, getCurrentTheme }}
    >
      <ChakraProvider
        colorModeManager={colorModeManager}
        theme={getCurrentTheme()}
      >
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = (): IUseTheme => {
  const {
    theme: contextTheme,
    setTheme,
    getCurrentLayout,
    getCurrentTheme,
  } = useContext(ThemeContext);
  const theme = process.env.ONLY_THEME || contextTheme;
  // const { colorMode } = useColorMode();

  return {
    theme,
    setTheme,
    getCurrentTheme: getCurrentTheme(),
    getCurrentLayout,
  };
};

export { BlastThemeProvider, useTheme };
