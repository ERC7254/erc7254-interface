"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";

import { colourOptions } from "@/constants/colorOptions";

import s from "./style.module.scss";

interface IAutocomplete {
  label: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function Autocomplete({
  label,
  isRequired = false,
  placeholder = "",
}: IAutocomplete): React.ReactElement {
  return (
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
        isClearable
        options={colourOptions}
        className={s.autocomplete}
        placeholder={placeholder}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            borderRadius: "25px",
            color: "black",
            padding: "20px",
            primary25: "#404833",
            primary: "#FCFC03",
          },
          ":hover": {
            padding: "12px",
            borderRadius: "25px",
            borderColor: "#404833",
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
            backgroundColor: state.isFocused
              ? "transparent"
              : "rgba(64, 72, 51, 0.5)",
            borderRadius: "25px",
            borderColor: state.isFocused ? "#404833" : "#404833",
            boxShadow: "none",
            height: "56px",
            color: "black !important",
            ":hover": {
              borderColor: "#404833",
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
              backgroundColor: "#404833",
            },
          }),
        }}
      />
    </Stack>
  );
}
