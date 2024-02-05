/* eslint-disable*/
"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  // CardFooter,
  CardHeader,
  SimpleGrid,
  // Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import * as yup from "yup";

// import { factoryAbi } from "@/abis/IFactory";
import Autocomplete from "@/components/ControlledFormElements/Autocomplete";
import Input from "@/components/ControlledFormElements/Input";
import Title from "@/components/Title";
import { NewToken } from "@/types/new-token";

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
  const { handleSubmit, register } = methods;

  // const { data: hash, error, writeContract } = useWriteContract();

  const onSubmit = (data: NewToken): void => {
    // writeContract({
    //   chainId: 168587773,
    //   address: "0x7f47E53D7eEeB1eC1C5b9ec10db6F172d9e1Dbdd",
    //   abi: factoryAbi,
    //   functionName: "create",
    //   args: [
    //     data.name,
    //     data.symbol,
    //     data.tokenReward,
    //     data.totalSupply * 10 ** 18,
    //   ],
    // });
  };

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });

  // const data = useReadContract({
  //   chainId: 168587773,
  //   abi: TokenRevenueAbi,
  //   address: "0x0709973e3f5be86d4648dc3302d1aea227322cd7",
  //   functionName: "symbol",
  // });
  // console.log(data);

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
            <Button type="submit">CREATE</Button>
          </Box>
        </CardBody>
        {/* <CardFooter>
          {hash && <Text>Transaction Hash: {hash}</Text>}
          {isConfirming && <Text>Waiting for confirmation...</Text>}
          {isConfirmed && <Text>Transaction confirmed.</Text>}
          {error && <Text>Error: {error.message}</Text>}
        </CardFooter> */}
      </Card>
    </Box>
  );
}
