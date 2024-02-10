"use client";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import Image from "next/image";
import { useAccount, useWriteContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import useRewardTokenName from "@/hooks/web3/useRewardTokenName";
import useRewardValueDisplay from "@/hooks/web3/useRewardValueDisplay";
import useTokenName from "@/hooks/web3/useTokenName";
import useTokenSymbol from "@/hooks/web3/useTokenSymbol";
import { TokenRevenueClaimable } from "@/types/token-revenue";
import { tokenRevertMapping } from "@/utils/tokenMapping";
import { truncateAddress } from "@/utils/truncateAddress";

import MintModal from "../MintModal";
import UpdateRewardModal from "../UpdateRewardModal";
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
  const rewardValue = useRewardValueDisplay(
    userAddress as `0x${string}`,
    tokenAddress as `0x${string}`,
  );
  const rewardToken = useRewardTokenName(tokenAddress as `0x${string}`);
  const tokenSymbol = useTokenSymbol(tokenAddress as `0x${string}`);
  const tokenRewardAddress = tokenRevertMapping(rewardToken);
  const {
    isOpen: isUpdateRewardModalOpen,
    onOpen: onUpdateRewardModalOpen,
    onClose: onUpdateRewardModalClose,
  } = useDisclosure();

  const {
    isOpen: isMintModalOpen,
    onOpen: onMintModalOpen,
    onClose: onMintModalClose,
  } = useDisclosure();

  const handleClaimReward = (): void => {
    isConnected
      ? writeContract({
          chainId: 168587773,
          address: tokenAddress as `0x${string}`,
          abi: TokenRevenueAbi,
          functionName: "getReward",
          args: [[tokenRewardAddress], userAddress],
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
        <Stack gap={2} alignItems="baseline">
          <Box className={s.title} maxWidth="500px">
            <Box className={s.title_inner} color={brandYellow200}>
              <Text className={s.bigTitle}>{tokenName}</Text>
            </Box>
          </Box>
          <Flex>
            <Text fontSize="lg" fontWeight="bold" color="brand.camo.200">
              ({tokenSymbol}) - {truncateAddress(tokenAddress)}
            </Text>
          </Flex>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end">
        <Text color="brand.yellow.200" fontSize="4xl">
          {`${rewardValue} ${rewardToken}`}
        </Text>
        <Flex gap={6}>
          <Button variant="ghost" onClick={onMintModalOpen}>
            MINT
          </Button>
          <Button variant="ghost" onClick={onUpdateRewardModalOpen}>
            UPDATE REWARD
          </Button>
          {Number(rewardValue) > 0 && (
            <Button onClick={() => handleClaimReward()}>CLAIM REWARD</Button>
          )}
        </Flex>

        <MintModal
          tokenAddress={tokenAddress as `0x${string}`}
          isOpen={isMintModalOpen}
          onClose={onMintModalClose}
        />

        <UpdateRewardModal
          tokenAddress={tokenAddress as `0x${string}`}
          isOpen={isUpdateRewardModalOpen}
          onClose={onUpdateRewardModalClose}
        />
      </Stack>
    </Stack>
  );
}
