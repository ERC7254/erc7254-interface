import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { parseEther } from "viem";
import {
  BaseError,
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as yup from "yup";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import Input from "@/components/ControlledFormElements/Input";
import useAllowance from "@/hooks/web3/useAllowance";
import useRewardTokenName from "@/hooks/web3/useRewardTokenName";
import useRewardValue from "@/hooks/web3/useRewardValue";
import { isEthAddress } from "@/utils/isEthAddress";

import ErrorModal from "../ErrorModal";
import SuccessModal from "../SuccessModal";

interface UpdateRewardModalProps {
  tokenAddress: `0x${string}`;
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues = {
  amount: 0,
};

export default function UpdateRewardModal({
  tokenAddress,
  isOpen,
  onClose,
}: UpdateRewardModalProps): React.ReactElement {
  const rewardToken = useRewardTokenName(tokenAddress);
  const { isConnected, address: userAddress } = useAccount();
  const allowance = useAllowance(userAddress as `0x${string}`, tokenAddress);

  const balanceRes = useBalance({
    address: userAddress,
    token:
      rewardToken.address === "0x4200000000000000000000000000000000000023"
        ? undefined
        : (rewardToken.address as `0x${string}`),
    // token: "0x4200000000000000000000000000000000000022"
  });

  const balance = balanceRes.data?.value;

  const validationSchema = yup.object({
    amount: yup
      .number()
      .required("Amount is required")
      .transform((value: number): number => (Number.isNaN(value) ? 0 : value))
      .min(0, `Amount must greater than ${0}`)
      .test("insufficient-balance", "Insufficient Balance", (value) => {
        return Number(value) * Number(10n ** 18n) < Number(balance);
      })
      .test(
        "amount-exceeded-allowance",
        `Amount must less than ${Number(allowance) / Number(10n ** 18n)}`,
        (value) => {
          if (rewardToken.name !== "ETH") {
            return Number(value) * Number(10n ** 18n) < Number(allowance);
          }
          return true;
        },
      ),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { data: hash, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();

  const {
    isOpen: isErrorModalOpen,
    onOpen: onErrorModalOpen,
    onClose: onErrorModalClose,
  } = useDisclosure();

  const { handleSubmit, register } = methods;

  const rewardValue = useRewardValue(
    userAddress as `0x${string}`,
    tokenAddress,
  );

  useEffect(() => {
    if (error) {
      onErrorModalOpen();
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      onSuccessModalOpen();
    }
  }, [isConfirmed]);

  const onSubmit = async (data: { amount: number }): Promise<void> => {
    const { amount } = data;
    const parseAmount = parseEther(amount.toString());
    const rewardTokenAddress = rewardToken.address;

    if (isConnected) {
      if (isEthAddress(rewardTokenAddress as `0x${string}`)) {
        writeContract({
          chainId: 168587773,
          address: tokenAddress,
          abi: TokenRevenueAbi,
          functionName: "updateReward",
          args: [[rewardTokenAddress], [parseAmount]],
          value: parseAmount,
        });
      } else {
        if (allowance !== undefined && rewardValue !== undefined) {
          writeContract({
            chainId: 168587773,
            address: tokenAddress,
            abi: TokenRevenueAbi,
            functionName: "updateReward",
            args: [[rewardTokenAddress], [parseAmount]],
          });
        }
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" gap={6} onSubmit={handleSubmit(onSubmit)}>
        <Text>Update Reward</Text>
        <Divider />
        <FormProvider {...methods}>
          <SimpleGrid columns={{ base: 1, md: 1 }} gap={6} mb={6}>
            <Input
              type="number"
              label={`Amount (${rewardToken.name})`}
              isRequired
              {...register("amount")}
            />
          </SimpleGrid>
        </FormProvider>

        <Button type="submit" isLoading={isConfirming}>
          UPDATE
        </Button>

        <SuccessModal
          hash={hash}
          isOpen={isSuccessModalOpen}
          onClose={onSuccessModalClose}
          isReload
        />
        <ErrorModal
          error={error as BaseError}
          isOpen={isErrorModalOpen}
          onClose={onErrorModalClose}
        />
      </ModalContent>
    </Modal>
  );
}
