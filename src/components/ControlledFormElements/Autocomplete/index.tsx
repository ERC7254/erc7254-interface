"use client";

import { Box, Stack, Text, useToken } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import { rewardTokenOptions } from "@/constants/rewardTokenList";

import ErrorIndicator from "../ErrorIndicator";

interface IAutocomplete {
  label: string;
  name: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function Autocomplete({
  label,
  name,
  isRequired = false,
  placeholder = "",
}: IAutocomplete): React.ReactElement {
  const { control } = useFormContext();

  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  const [brandYellow200, brandCamo300, brandCamo200] = useToken("colors", [
    "brand.yellow.200",
    "brand.camo.300",
    "brand.camo.200",
  ]);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <Stack rowGap={2}>
          <Text fontSize="md">
            {label}
            {isRequired && (
              <Box as="span" color="brand.mars">
                *
              </Box>
            )}
          </Text>
          <CreatableSelect
            {...field}
            value={rewardTokenOptions.find(
              (item) => item.value === field.value,
            )}
            onChange={(item): void => field.onChange(item?.value)}
            id={id}
            isClearable
            options={rewardTokenOptions}
            placeholder={placeholder}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                borderRadius: "25px",
                color: "black",
                padding: "20px",
                primary25: brandCamo300,
                primary: brandYellow200,
              },
              ":hover": {
                padding: "12px",
                borderRadius: "25px",
                borderColor: brandCamo300,
              },
            })}
            styles={{
              menu: (baseStyles) => ({
                ...baseStyles,
                color: "white",
                background: "black",
                borderRadius: "25px",
                padding: "24px",
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "white",
                fontSize: "16px",
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                color: "white",
                fontSize: "16px",
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "md",
                backgroundColor: state.isFocused ? "transparent" : "#4048337f",
                borderRadius: "25px",
                borderColor: brandCamo300,
                boxShadow: "none",
                height: "56px",
                color: "black !important",
                ":hover": {
                  borderColor: brandCamo300,
                },
                ":active": {},
              }),
              menuList: () => ({
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
              }),
              option: () => ({
                transition: "all 0.15s ease-in-out",
                padding: "12px",
                ":hover": {
                  padding: "12px 24px",
                  borderRadius: "25px",
                  backgroundColor: brandCamo300,
                },
              }),
              indicatorSeparator: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: brandCamo300,
              }),
              indicatorsContainer: (baseStyles) => ({
                ...baseStyles,
                color: brandCamo300,
                svg: {
                  color: brandCamo200,
                },
              }),
              valueContainer: (baseStyles) => ({
                ...baseStyles,
                paddingLeft: "16px",
              }),
            }}
          />
          {invalid && <ErrorIndicator text={error?.message} />}
        </Stack>
      )}
    />
  ) : (
    <Stack />
  );
}
