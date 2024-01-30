import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { commonBadge } from "../commons";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    bg: "green.300",
    color: "gray.800",
    ...commonBadge.baseStyle,
  },
};

const themeDark = extendTheme({
  config,
  components: {
    Badge,
  },
});

export default themeDark;
