import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";

const useRewardValue = (
  userAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
): bigint | undefined => {
  const [rewardValue, setRewardValue] = useState<bigint>(0n);

  const res = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress as `0x${string}`,
    functionName: "viewReward",
    args: [userAddress],
  });

  useEffect(() => {
    if (res.data === undefined || res.data === null || !res.data) return;
    else {
      setRewardValue((res.data as bigint[])[0]);
    }
  }, [res.data]);

  return rewardValue;
};

export default useRewardValue;
