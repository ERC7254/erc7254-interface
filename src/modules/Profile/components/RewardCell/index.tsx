import { Text } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import { tTokenRevenue } from "@/types/token-revenue";
import { tokenMapping } from "@/utils/tokenMapping";

interface RewardCellProps {
  row: Row<tTokenRevenue>;
}

export default function RewardCell({
  row,
}: RewardCellProps): React.ReactElement {
  const tokenAddress = row.original.token.id as `0x${string}`;
  const userAddress = row.original.owner;
  const [rewardValue, setRewardValue] = useState("0");

  const tokenValueRes = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress,
    functionName: "viewReward",
    args: [userAddress],
  });

  const tokenRewardRes = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress,
    functionName: "tokenReward",
  });

  const rewardTokenName = tokenMapping(tokenRewardRes?.data as string);

  useEffect(() => {
    if (
      tokenValueRes.data === undefined ||
      tokenValueRes.data === null ||
      !tokenValueRes.data
    )
      return;
    else {
      setRewardValue(
        (
          Number((tokenValueRes.data as bigint[])[0]) / Number(10n ** 18n)
        ).toFixed(4),
      );
    }
  }, [tokenValueRes.data]);

  return (
    <Text fontSize="sm">
      {rewardValue} {rewardTokenName}
    </Text>
  );
}
