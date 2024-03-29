"use client";

import { Box, Input as ChakraInput, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import ErrorIndicator from "../ErrorMessage";

interface IInput {
  type?: "number";
  label: string;
  name: string;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  label,
  name,
  isRequired = false,
  placeholder = "",
  defaultValue = "",
  onChange,
}: IInput): React.ReactElement {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) => (
        <Stack rowGap={2} position="relative">
          <Text fontSize="md">
            {label}
            {isRequired && (
              <Box as="span" color="brand.mars">
                *
              </Box>
            )}
          </Text>
          <ChakraInput
            type={type}
            step="0.01"
            placeholder={placeholder}
            variant="filled"
            size="lg"
            {...field}
            value={field.value}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              }
              field.onChange(e);
            }}
          />
          {invalid && <ErrorIndicator text={error?.message} />}
        </Stack>
      )}
    ></Controller>
  );
}
