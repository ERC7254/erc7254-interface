import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const Button: ComponentStyleConfig = {
  baseStyle: {
    bg: "green.300",
    color: "gray.800",
  },
};

const themeDark = extendTheme({
  config,
  components: {
    Button,
  },
});

export default themeDark;
