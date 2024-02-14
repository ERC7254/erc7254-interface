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
import { erc20Abi, parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as yup from "yup";

import Input from "@/components/ControlledFormElements/Input";
import useRewardTokenName from "@/hooks/web3/useRewardTokenName";

import SuccessModal from "../SuccessModal";

interface UpdateApproveModalProps {
  tokenAddress: `0x${string}`;
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues = {
  amount: 0,
};

export default function UpdateApproveModal({
  tokenAddress,
  isOpen,
  onClose,
}: UpdateApproveModalProps): React.ReactElement {
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

  const {
    data: approveHash,
    // error: approveError,
    writeContract: writeApproveContract,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const {
    isOpen: isSuccessApproveOpen,
    onOpen: onSuccessApproveOpen,
    onClose: onSuccessApproveClose,
  } = useDisclosure();

  const { handleSubmit, register } = methods;

  useEffect(() => {
    if (isApproveConfirmed) {
      onSuccessApproveOpen();
    }
  }, [isApproveConfirmed]);

  const onSubmit = (data: { amount: number }): void => {
    const { amount } = data;
    const parseAmount = parseEther(amount.toString());

    isConnected
      ? writeApproveContract({
          chainId: 168587773,
          address: "0x4200000000000000000000000000000000000022",
          abi: erc20Abi,
          functionName: "approve",
          args: [tokenAddress, parseAmount],
        })
      : null;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form" gap={6} onSubmit={handleSubmit(onSubmit)}>
          <Text>Update Reward</Text>
          <Divider />
          <FormProvider {...methods}>
            <SimpleGrid columns={{ base: 1, md: 1 }} gap={6} mb={6}>
              <Input
                type="number"
                label={`Amount (${tokenReward.name})`}
                isRequired
                {...register("amount")}
              />
            </SimpleGrid>
          </FormProvider>
          <Button type="submit" isLoading={isApproveConfirming}>
            APPROVE
          </Button>
        </ModalContent>
      </Modal>
      <SuccessModal
        hash={approveHash}
        isOpen={isSuccessApproveOpen}
        onClose={onSuccessApproveClose}
        isReload
      />
    </>
  );
}
