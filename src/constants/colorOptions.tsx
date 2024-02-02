import { Box, Stack, Text } from "@chakra-ui/react";

export const colourOptions = [
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  {
    value: "green",
    label: (
      <Stack direction={"row"} width={"100%"} overflow={"hidden"}>
        <Box width={45} height={45} bg={"green"}></Box>
        <Text>Green</Text>
      </Stack>
    ),
    color: "#36B37E",
  },
];
