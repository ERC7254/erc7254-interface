import { Text } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import React from "react";

import useRewardTokenName from "@/hooks/web3/useRewardTokenName";
import useRewardValueDisplay from "@/hooks/web3/useRewardValueDisplay";
import { tTokenRevenue } from "@/types/token-revenue";

interface RewardCellProps {
  row: Row<tTokenRevenue>;
}

export default function RewardCell({
  row,
}: RewardCellProps): React.ReactElement {
  const tokenAddress =
    (row.original.token?.id as `0x${string}`) || row.original.tokenAddress?.id;
  const userAddress = row.original.userAddress;

  const rewardValueDisplay = useRewardValueDisplay(
    userAddress as `0x${string}`,
    tokenAddress as `0x${string}`,
  );

  const rewardToken = useRewardTokenName(tokenAddress as `0x${string}`);

  return (
    <Text fontSize="sm">{`${rewardValueDisplay} ${rewardToken.name}`}</Text>
  );
}
