"use client";
import { Box, Text, useToken } from "@chakra-ui/react";

import s from "./style.module.scss";

export default function OwnedTokensTitle(): React.ReactElement {
  const [brandYellow200] = useToken("colors", ["brand.yellow.200"]);

  return (
    <Box className={s.title}>
      <Box className={s.title_inner} color={brandYellow200}>
        <Text className={s.bigTitle}>Owned Tokens</Text>
      </Box>
    </Box>
  );
}
