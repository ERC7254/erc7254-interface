import { Box, Text } from "@chakra-ui/react";

import s from "./style.module.scss";

export default function HomeHero(): React.ReactElement {
  return (
    <Box className={s.hero} bg="brand.yellow.200">
      <Box className={s.hero_inner} color="black">
        <Text className={s.bigTitle}>Token</Text>
        <Text className={s.bigTitle}>Revenue</Text>
        <Text className={s.bigTitle}>Sharing</Text>
      </Box>
      <Box className={s.hero_desc}>
        <Text color="black" className={s.desc}>
          Revenue token is a token that shares rewards for holders.
        </Text>
      </Box>
    </Box>
  );
}
