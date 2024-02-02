"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import type { Dict } from "@chakra-ui/utils";
import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

import themeDark from "@/themes/dark";
import themeLight from "@/themes/light";

interface IProps {
  children: React.ReactNode;
  cookies: string;
}

interface IUseTheme {
  theme: string;
  setTheme: (value: THEME) => void;
  getCurrentTheme: Dict | undefined | void;
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
}

const ThemeContext = createContext<IThemes>({
  theme: (getCookie("blastTheme") as THEME) || defaultTheme,
  setTheme: () => {
    return;
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
  return (getCookie("blastTheme") as THEME) || defaultTheme;
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

  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <CacheProvider>
      <ThemeContext.Provider value={{ setTheme, theme, getCurrentTheme }}>
        <ChakraProvider
          colorModeManager={colorModeManager}
          theme={getCurrentTheme()}
        >
          <ColorModeScript
            initialColorMode={getCurrentTheme()!.config.initialColorMode}
            type="cookie"
          />
          {children}
        </ChakraProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
};

const useTheme = (): IUseTheme => {
  const {
    theme: contextTheme,
    setTheme,
    getCurrentTheme,
  } = useContext(ThemeContext);
  const theme = process.env.ONLY_THEME || contextTheme;
  // const { colorMode } = useColorMode();

  return {
    theme,
    setTheme,
    getCurrentTheme: getCurrentTheme(),
  };
};

export { BlastThemeProvider, useTheme };
