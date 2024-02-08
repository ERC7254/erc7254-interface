"use client";
import { Box, Button, Flex, Stack, Text, useToken } from "@chakra-ui/react";
import Image from "next/image";
import { useAccount, useWriteContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import useRewardTokenName from "@/hooks/useRewardTokenName";
import useRewardValue from "@/hooks/useRewardValue";
import useTokenName from "@/hooks/useTokenName";
import useTokenSymbol from "@/hooks/useTokenSymbol";
import { TokenRevenueClaimable } from "@/types/token-revenue";

import s from "./style.module.scss";

interface ITokenDetailHero {
  token?: TokenRevenueClaimable;
  tokenAddress: string;
}

export default function TokenDetailHero({
  token,
  tokenAddress,
}: ITokenDetailHero): React.ReactElement {
  const [brandYellow200] = useToken("colors", ["brand.yellow.200"]);
  const account = useAccount();
  const { isConnected, address: userAddress } = account;
  const { writeContract } = useWriteContract();

  const tokenName = useTokenName(tokenAddress as `0x${string}`);
  const rewardValue = useRewardValue(
    userAddress as `0x${string}`,
    tokenAddress as `0x${string}`,
  );
  const rewardToken = useRewardTokenName(tokenAddress as `0x${string}`);
  const tokenSymbol = useTokenSymbol(tokenAddress as `0x${string}`);

  const handleClaimReward = (): void => {
    console.log(isConnected);
    isConnected
      ? writeContract({
          chainId: 168587773,
          address: tokenAddress as `0x${string}`,
          abi: TokenRevenueAbi,
          functionName: "getReward",
          args: [[tokenAddress], userAddress],
        })
      : null;
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems={{ base: "flex-start", md: "flex-end" }}
      mb="64px"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={4}
        alignItems="flex-start"
        mb={{ base: 6, md: "unset" }}
      >
        <Box
          position="relative"
          aspectRatio={1}
          width="64px"
          borderRadius="50%"
          overflow="hidden"
        >
          <Image
            src={token?.logo || "/branding/placeholder-logo.png"}
            alt={tokenName || "logo"}
            fill
          />
        </Box>
        <Stack direction={{ base: "row", md: "column" }} alignItems="flex-end">
          {/* <Flex gap={4} alignItems="flex-end"> */}
          <Box className={s.title}>
            <Box className={s.title_inner} color={brandYellow200}>
              <Text className={s.bigTitle}>{tokenName}</Text>
            </Box>
          </Box>
          <Text color="brand.camo.200">({tokenSymbol})</Text>
          {/* </Flex> */}
        </Stack>
      </Stack>
      <Stack alignItems="flex-end" gap={6}>
        <Text color="brand.yellow.200" fontSize="4xl">
          {`${rewardValue} ${rewardToken}`}
        </Text>
        <Flex gap={6}>
          <Button variant="ghost">UPDATE REWARD</Button>
          {Number(rewardValue) > 0 && (
            <Button onClick={() => handleClaimReward()}>CLAIM REWARD</Button>
          )}
        </Flex>
      </Stack>
    </Stack>
  );
}
