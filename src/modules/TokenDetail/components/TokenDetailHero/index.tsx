"use client";
import { Box, Button, Flex, Stack, Text, useToken } from "@chakra-ui/react";
import Image from "next/image";

import { TokenRevenueClaimable } from "@/types/token-revenue";

import s from "./style.module.scss";

interface ITokenDetailHero {
  token?: TokenRevenueClaimable;
}

export default function TokenDetailHero({
  token,
}: ITokenDetailHero): React.ReactElement {
  const [brandYellow200] = useToken("colors", ["brand.yellow.200"]);

  // const { name, symbol, reward, tokenReward, logo } = token;

  return (
    <Flex justifyContent="space-between" alignItems="flex-end" mb="64px">
      <Flex gap={4} alignItems="flex-start">
        <Box
          position="relative"
          aspectRatio={1}
          width="64px"
          borderRadius="50%"
          overflow="hidden"
        >
          <Image src={token?.logo as string} alt={token?.name as string} fill />
        </Box>
        <Stack>
          {/* <Flex gap={4} alignItems="flex-end"> */}
          <Box className={s.title}>
            <Box className={s.title_inner} color={brandYellow200}>
              <Text className={s.bigTitle}>{token?.name}</Text>
            </Box>
          </Box>
          <Text color="brand.camo.200">({token?.symbol})</Text>
          {/* </Flex> */}
        </Stack>
      </Flex>
      <Stack alignItems="flex-end" gap={6}>
        <Text color="brand.yellow.200" fontSize="4xl">
          {`${token?.reward} ${token?.tokenReward}`}
        </Text>
        <Flex gap={6}>
          <Button variant="ghost">UPDATE REWARD</Button>
          {Number(token?.reward) > 0 && <Button>CLAIM REWARD</Button>}
        </Flex>
      </Stack>
    </Flex>
  );
}
