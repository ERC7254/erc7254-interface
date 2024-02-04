"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import Autocomplete from "@/components/ControlledFormElements/Autocomplete";
import Input from "@/components/ControlledFormElements/Input";
import Title from "@/components/Title";
import { NewToken } from "@/types/new-token";

import s from "./style.module.scss";
// import { useReadContract } from "wagmi";

// import { abi } from "@/abis/IFactory";
// import { config } from "@/wagmi/config";

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

  const onSubmit = (data: NewToken): void => console.log(data);
  // const data = useReadContract({
  //   chainId: 168587773,
  //   abi,
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
      </Card>
    </Box>
  );
}
