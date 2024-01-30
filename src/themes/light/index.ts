import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

import { commonBadge } from "../commons";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    bg: "blue.500",
    color: "white",
    ...commonBadge.baseStyle,
  },
};

const themeLight = extendTheme({
  config,
  components: {
    Badge,
  },
});

export default themeLight;
