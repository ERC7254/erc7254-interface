"use client";

import { Button } from "@chakra-ui/react";

import { THEME, useTheme } from "@/contexts/ChakraProvider";
import HomePage from "@/pages/Home";

export default function Home(): React.ReactElement {
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
