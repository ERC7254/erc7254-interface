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
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as yup from "yup";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import Input from "@/components/ControlledFormElements/Input";

import ErrorModal from "../ErrorModal";
import SuccessModal from "../SuccessModal";

interface MintModalProps {
  tokenAddress: `0x${string}`;
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues = {
  amount: 0,
};

const validationSchema = yup.object({
  amount: yup
    .number()
    .required("Amount is required")
    .transform((value: number): number => (Number.isNaN(value) ? 0 : value)),
});

export default function MintModal({
  tokenAddress,
  isOpen,
  onClose,
}: MintModalProps): React.ReactElement {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });
  const { isConnected, address: userAddress } = useAccount();
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

  const { handleSubmit, register } = methods;

  const onSubmit = (data: { amount: number }): void => {
    const { amount } = data;
    const parseAmount = parseEther(amount.toString());

    isConnected
      ? writeContract({
          chainId: 168587773,
          address: tokenAddress,
          abi: TokenRevenueAbi,
          functionName: "mint",
          args: [userAddress, parseAmount],
        })
      : null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" gap={6} onSubmit={handleSubmit(onSubmit)}>
        <Text>Mint</Text>
        <Divider />
        <FormProvider {...methods}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Input
              type="number"
              label={`Amount`}
              isRequired
              {...register("amount")}
            />
          </SimpleGrid>
        </FormProvider>
        <Button type="submit" isLoading={isConfirming}>
          MINT
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
