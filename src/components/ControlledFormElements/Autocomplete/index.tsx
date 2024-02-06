"use client";

import { Box, Flex, Stack, Text, useToken } from "@chakra-ui/react";
import { CSSProperties, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select, { ClearIndicatorProps } from "react-select";

import SvgInsert from "@/components/SvgInsert";
import { IRewardToken, rewardTokenOptions } from "@/constants/rewardTokenList";
import { truncateAddress } from "@/utils/truncateAddress";

import ErrorIndicator from "../ErrorMessage";
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

  const components = {
    ClearIndicator: (
      props: ClearIndicatorProps<IRewardToken, false>,
    ): React.ReactElement => {
      const {
        getStyles,
        innerProps: { ref, ...restInnerProps },
      } = props;
      return (
        <Box
          p={2}
          {...restInnerProps}
          ref={ref}
          style={getStyles("clearIndicator", props) as CSSProperties}
        >
          <SvgInsert src="/icons/cross.svg" fill={brandCamo200} />
        </Box>
      );
    },
    DropdownIndicator: () => (
      <Box p={2}>
        <SvgInsert src="/icons/chevron.svg" />
      </Box>
    ),
  };

  const filterOptions = (
    candidate: { label: string; value: string; data: IRewardToken },
    input: string,
  ): boolean => {
    const inputLowerCase = input.toLowerCase();
    return (
      candidate.data.label.toLowerCase().includes(inputLowerCase) ||
      candidate.data.value.toLowerCase().includes(inputLowerCase)
    );
  };

  const formatOptionLabel = (
    option: IRewardToken,
    { context }: { context: string },
  ): React.ReactElement =>
    context === "value" ? (
      <Text>{option.label}</Text>
    ) : (
      <Flex width={"100%"} gap={2}>
        <Text fontSize="sm">{option.label}</Text>
        <Text fontSize="sm" color="#ffffff90">
          ({truncateAddress(option.value)})
        </Text>
      </Flex>
    );

  return isMounted ? (
    <Controller
      name={name}
      control={control}
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
          <Select
            {...field}
            formatOptionLabel={formatOptionLabel}
            components={components}
            filterOption={filterOptions}
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
              }),
              option: () => ({
                transition: "all 0.15s ease-in-out",
                cursor: "pointer",
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
