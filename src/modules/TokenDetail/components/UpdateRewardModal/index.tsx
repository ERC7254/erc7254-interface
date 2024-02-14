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
  const tokenReward = useRewardTokenName(tokenAddress);
  const { isConnected, address: userAddress } = useAccount();
  const balanceRes = useBalance({
    address: userAddress,
    token:
      tokenReward.address === "0x4200000000000000000000000000000000000023"
        ? undefined
        : (tokenReward.address as `0x${string}`),
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
      }),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { data: hash, error, writeContract } = useWriteContract();
  const {
    data: approveHash,
    // error: approveError,
    writeContract: writeApproveContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const {
    isOpen: isSuccessApproveOpen,
    onOpen: onSuccessApproveOpen,
    onClose: onSuccessApproveClose,
  } = useDisclosure();

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

  const { handleSubmit, register, getValues } = methods;

  const allowance = useAllowance(userAddress as `0x${string}`, tokenAddress);
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

  useEffect(() => {
    if (isApproveConfirmed) {
      onSuccessApproveOpen();

      onSubmit({
        amount: getValues("amount"),
      });
    }
  }, [isApproveConfirmed]);

  const handleApprove = (data: { amount: number }): void => {
    const { amount } = data;
    const parseAmount = parseEther(amount.toString());
    writeApproveContract({
      chainId: 168587773,
      address: tokenAddress,
      abi: TokenRevenueAbi,
      functionName: "approve",
      args: [tokenAddress, parseAmount],
    });
  };

  const onSubmit = async (data: { amount: number }): Promise<void> => {
    const { amount } = data;
    const parseAmount = parseEther(amount.toString());
    const tokenRewardAddress = tokenReward.address;

    if (isConnected) {
      if (isEthAddress(tokenRewardAddress as `0x${string}`)) {
        writeContract({
          chainId: 168587773,
          address: tokenAddress,
          abi: TokenRevenueAbi,
          functionName: "updateReward",
          args: [[tokenRewardAddress], [parseAmount]],
          value: parseAmount,
        });
      } else {
        if (allowance !== undefined && rewardValue !== undefined) {
          if (allowance <= rewardValue) {
            // console.log("need approve");
            // await writeApproveContract({
            //   chainId: 168587773,
            //   address: tokenAddress,
            //   abi: TokenRevenueAbi,
            //   functionName: "approve",
            //   args: [tokenAddress, parseAmount],
            // });
            // if (isApproveConfirmed) {
            //   console.log("approved, now update reward");
            //   await writeContract({
            //     chainId: 168587773,
            //     address: tokenAddress,
            //     abi: TokenRevenueAbi,
            //     functionName: "updateReward",
            //     args: [[tokenRewardAddress], [parseAmount]],
            //   });
            // }
          } else {
            console.log("approved before, now update reward");
            console.log(tokenRewardAddress, parseAmount);
            writeContract({
              chainId: 168587773,
              address: tokenAddress,
              abi: TokenRevenueAbi,
              functionName: "updateReward",
              args: [[tokenRewardAddress], [parseAmount]],
            });
          }
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
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={6}>
            <Input
              type="number"
              label={`Amount (${tokenReward.name})`}
              isRequired
              {...register("amount")}
            />
          </SimpleGrid>
        </FormProvider>

        {allowance! <= rewardValue! ? (
          <Button
            onClick={handleSubmit(handleApprove)}
            isLoading={isApproveConfirming}
          >
            APPROVE
          </Button>
        ) : (
          <Button type="submit" isLoading={isConfirming}>
            UPDATE
          </Button>
        )}

        <SuccessModal
          hash={approveHash}
          isOpen={isSuccessApproveOpen}
          onClose={onSuccessApproveClose}
          isReload
        />

        <SuccessModal
          hash={hash}
          isOpen={isSuccessModalOpen}
          onClose={onSuccessModalClose}
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
