"use client";
import { Box, Text, useToken } from "@chakra-ui/react";

import s from "./style.module.scss";

export default function TokensTitle(): React.ReactElement {
  const [brandYellow200] = useToken("colors", ["brand.yellow.200"]);

  return (
    <Box className={s.title}>
      <Box className={s.title_inner} color={brandYellow200}>
        <Text className={s.bigTitle}>Token List</Text>
      </Box>
    </Box>
  );
}
