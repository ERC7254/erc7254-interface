"use client";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import SvgInsert from "@/components/SvgInsert";
import { useCopyToClipboard } from "@/hooks/common/useCopyToClipboard";
import useAllowance from "@/hooks/web3/useAllowance";
import useRewardTokenName from "@/hooks/web3/useRewardTokenName";
import useRewardValue from "@/hooks/web3/useRewardValue";
import useRewardValueDisplay from "@/hooks/web3/useRewardValueDisplay";
import useTokenName from "@/hooks/web3/useTokenName";
import useTokenSymbol from "@/hooks/web3/useTokenSymbol";
import { TokenRevenueClaimable } from "@/types/token-revenue";
import { truncateAddress } from "@/utils/truncateAddress";

import ErrorModal from "../ErrorModal";
import MintModal from "../MintModal";
import SuccessModal from "../SuccessModal";
import UpdateApproveModal from "../UpdateAllowanceModal";
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
  const allowance = useAllowance(
    userAddress as `0x${string}`,
    tokenAddress as `0x${string}`,
  );

  const { data: hash, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [_, copy] = useCopyToClipboard();

  const tokenName = useTokenName(tokenAddress as `0x${string}`);
  const rewardValueDisplay = useRewardValueDisplay(
    userAddress as `0x${string}`,
    tokenAddress as `0x${string}`,
  );
  const rewardValue = useRewardValue(
    userAddress as `0x${string}`,
    tokenAddress as `0x${string}`,
  );

  const rewardToken = useRewardTokenName(tokenAddress as `0x${string}`);
  const tokenSymbol = useTokenSymbol(tokenAddress as `0x${string}`);
  const tokenRewardAddress = rewardToken.address;
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

  const handleCopy = (text: string) => () => {
    copy(text);
  };

  useEffect(() => {
    setIsSuccessModalOpen(isConfirmed);
  }, [isConfirmed]);

  useEffect(() => {
    setIsErrorModalOpen(Boolean(error));
  }, [error]);

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
          <Flex gap={2}>
            <Text fontSize="lg" fontWeight="bold" color="brand.camo.200">
              ({tokenSymbol}) - {truncateAddress(tokenAddress)}
            </Text>
            <IconButton
              isRound
              size="sm"
              variant="ghost"
              onClick={handleCopy(tokenAddress as string)}
              aria-label="Copy address"
              icon={<SvgInsert src="/icons/copy.svg" className={s.icon} />}
            />
          </Flex>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end">
        {isConnected ? (
          <>
            <Text color="brand.yellow.200" fontSize="4xl">
              {`${rewardValueDisplay} ${rewardToken.name}`}
            </Text>
            <Flex gap={6}>
              <Button variant="ghost" onClick={onMintModalOpen}>
                MINT
              </Button>
              <Button variant="ghost" onClick={onUpdateRewardModalOpen}>
                UPDATE REWARD
              </Button>
              {Number(rewardValueDisplay) > 0 && (
                <Button
                  onClick={() => handleClaimReward()}
                  isLoading={isConfirming}
                >
                  CLAIM REWARD
                </Button>
              )}
            </Flex>

            <MintModal
              tokenAddress={tokenAddress as `0x${string}`}
              isOpen={isMintModalOpen}
              onClose={onMintModalClose}
            />

            {allowance! <= rewardValue! && rewardToken.name !== "ETH" ? (
              <UpdateApproveModal
                tokenAddress={tokenAddress as `0x${string}`}
                isOpen={isUpdateRewardModalOpen}
                onClose={onUpdateRewardModalClose}
              />
            ) : (
              <UpdateRewardModal
                tokenAddress={tokenAddress as `0x${string}`}
                isOpen={isUpdateRewardModalOpen}
                onClose={onUpdateRewardModalClose}
              />
            )}
          </>
        ) : (
          <Text color="brand.camo.300" fontSize="sm">
            (Please connect wallet first)
          </Text>
        )}
      </Stack>
      <SuccessModal
        hash={hash}
        isOpen={isSuccessModalOpen}
        onClose={setIsSuccessModalOpen}
        isReload
      />
      <ErrorModal
        error={error as BaseError}
        isOpen={isErrorModalOpen}
        onClose={setIsErrorModalOpen}
      />
    </Stack>
  );
}
