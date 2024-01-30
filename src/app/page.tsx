"use client";

import { THEME, useTheme } from "@/contexts/ChakraProvider";
import HomePage from "@/pages/Home";
import { Button, useColorMode } from "@chakra-ui/react";

export default function Home() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <Button
        onClick={() =>
          setTheme(theme === THEME.Light ? THEME.Dark : THEME.Light)
        }
      >
        Toggle {theme === THEME.Light ? THEME.Dark : THEME.Light}
      </Button>
      <HomePage />
    </main>
  );
}
