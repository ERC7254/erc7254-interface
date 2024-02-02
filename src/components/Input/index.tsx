"use client";

import { Box, Input as ChakraInput, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface IInput {
  label: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function Input({
  label,
  isRequired = false,
  placeholder = "",
}: IInput): React.ReactElement {
  const [value, setValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setValue(event.target.value);

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
      <ChakraInput
        placeholder={placeholder}
        variant="filled"
        size="lg"
        value={value}
        onChange={handleChange}
      />
    </Stack>
  );
}
