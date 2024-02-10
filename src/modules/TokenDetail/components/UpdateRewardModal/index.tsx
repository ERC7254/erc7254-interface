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
import Autocomplete from "@/components/ControlledFormElements/Autocomplete";
import Input from "@/components/ControlledFormElements/Input";
import useAllowance from "@/hooks/web3/useAllowance";
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
  tokenReward: "",
  amount: 0,
};

export default function UpdateRewardModal({
  tokenAddress,
  isOpen,
  onClose,
}: UpdateRewardModalProps): React.ReactElement {
  const { isConnected, address: userAddress } = useAccount();
  const balanceRes = useBalance({
    address: userAddress,
    // token: "0x4200000000000000000000000000000000000022"
  });

  const balance = balanceRes.data?.value;

  const validationSchema = yup.object({
    tokenReward: yup.string().required("Token Reward is required"),
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

  const {
    // isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
  } = useWaitForTransactionReceipt({
    hash: approveHash,
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
      onSubmit({
        tokenReward: getValues("tokenReward"),
        amount: getValues("amount"),
      });
    }
  }, [isApproveConfirmed]);

  const onSubmit = async (data: {
    tokenReward: `0x${string}` | string;
    amount: number;
  }): Promise<void> => {
    const { tokenReward, amount } = data;
    const parseAmount = parseEther(amount.toString());

    if (isConnected) {
      if (isEthAddress(tokenReward as `0x${string}`)) {
        writeContract({
          chainId: 168587773,
          address: tokenAddress,
          abi: TokenRevenueAbi,
          functionName: "updateReward",
          args: [[tokenReward], [parseAmount]],
          value: parseAmount,
        });
      } else {
        if (allowance !== undefined && rewardValue !== undefined) {
          if (allowance <= rewardValue) {
            // console.log("need approve");
            await writeApproveContract({
              chainId: 168587773,
              address: tokenAddress,
              abi: TokenRevenueAbi,
              functionName: "approve",
              args: [tokenAddress, parseAmount],
            });

            // if (isApproveConfirmed) {
            //   console.log("approved, now update reward");

            //   await writeContract({
            //     chainId: 168587773,
            //     address: tokenAddress,
            //     abi: TokenRevenueAbi,
            //     functionName: "updateReward",
            //     args: [[tokenReward], [parseAmount]],
            //   });
            // }
          } else {
            // console.log("approved before, now update reward");
            writeContract({
              chainId: 168587773,
              address: tokenAddress,
              abi: TokenRevenueAbi,
              functionName: "updateReward",
              args: [[tokenReward], [parseAmount]],
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
            <Autocomplete
              label="Token Reward"
              isRequired
              {...register("tokenReward")}
            />
            <Input
              type="number"
              label="Amount"
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