"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { parseEther } from "viem";
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as yup from "yup";

import { factoryAbi } from "@/abis/IFactory";
import Autocomplete from "@/components/ControlledFormElements/Autocomplete";
import Input from "@/components/ControlledFormElements/Input";
import Title from "@/components/Title";
import { WalletOptions } from "@/layouts/Header/components/WalletOptions";
import { TokenRevenue } from "@/types/token-revenue";

import ErrorModal from "../ErrorModal";
import SuccessModal from "../SuccessModal";
import s from "./style.module.scss";

const defaultValues = {
  name: "",
  symbol: "",
  tokenReward: "",
  totalSupply: 0,
};

const MINIMUM_SUPPLY = 100;

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  symbol: yup.string().required("Symbol is required"),
  tokenReward: yup.string().required("Token reward is required"),
  totalSupply: yup
    .number()
    .required("Total supply is required")
    .transform((value: number): number => (Number.isNaN(value) ? 0 : value))
    .min(MINIMUM_SUPPLY, `Total supply must greater than ${MINIMUM_SUPPLY}`),
});

export default function HomeForm(): React.ReactElement {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });
  const { isConnected } = useAccount();
  const { handleSubmit, register } = methods;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const onSubmit = (data: TokenRevenue): void => {
    const parseAmount = parseEther(data.totalSupply.toString());

    isConnected
      ? writeContract({
          chainId: 168587773,
          address: "0x7f47E53D7eEeB1eC1C5b9ec10db6F172d9e1Dbdd",
          abi: factoryAbi,
          functionName: "create",
          args: [data.name, data.symbol, data.tokenReward, parseAmount],
        })
      : onOpen();
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    setIsSuccessModalOpen(isConfirmed);
  }, [isConfirmed]);

  useEffect(() => {
    setIsErrorModalOpen(Boolean(error));
  }, [error]);

  return (
    <Box className={s.form}>
      <Card
        className={s.form_inner}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardHeader>
          <Title size="sm" color="brand.yellow.200">
            Create NEW
          </Title>
          <Title size="sm" color="brand.yellow.200">
            Token Revenue Sharing
          </Title>
        </CardHeader>
        <CardBody>
          <FormProvider {...methods}>
            <SimpleGrid columns={{ base: 1, md: 2 }} className={s.form_grid}>
              <Input label="Name" isRequired {...register("name")} />
              <Input label="Symbol" isRequired {...register("symbol")} />
              <Autocomplete
                label="Token Reward"
                isRequired
                {...register("tokenReward")}
              />
              <Input
                type="number"
                label="Total supply"
                isRequired
                {...register("totalSupply")}
              />
            </SimpleGrid>
          </FormProvider>

          <Box className={s.submitBtn}>
            <Button type="submit" isLoading={isConfirming}>
              {isConnected ? "CREATE" : "CONNECT WALLET TO CREATE"}
            </Button>
          </Box>
        </CardBody>
        <CardFooter>
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
        </CardFooter>
      </Card>
      <WalletOptions isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
