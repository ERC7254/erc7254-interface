import { Stack, Text } from "@chakra-ui/react";

export interface IRewardToken {
  name: string;
  value: string;
  label: React.ReactElement;
}

export const rewardTokenOptions: IRewardToken[] = [
  {
    name: "WETH",
    value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    label: (
      <Stack direction={"row"} width={"100%"} overflow={"hidden"}>
        <Text>WETH</Text>
      </Stack>
    ),
  },
  {
    name: "ETH",
    value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc3",
    label: (
      <Stack direction={"row"} width={"100%"} overflow={"hidden"}>
        <Text>ETH</Text>
      </Stack>
    ),
  },
  {
    name: "BTC",
    value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc4",
    label: (
      <Stack direction={"row"} width={"100%"} overflow={"hidden"}>
        <Text>BTC</Text>
      </Stack>
    ),
  },
];
