import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";

const useRewardValueDisplay = (
  userAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
): string | undefined => {
  const [rewardValue, setRewardValue] = useState("");

  const tokenValueRes = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress as `0x${string}`,
    functionName: "viewReward",
    args: [userAddress],
  });

  useEffect(() => {
    if (
      tokenValueRes.data === undefined ||
      tokenValueRes.data === null ||
      !tokenValueRes.data
    )
      return;
    else {
      setRewardValue(
        (Number((tokenValueRes.data as bigint[])[0]) / Number(10n ** 18n))
          .toFixed(18)
          .replace(/\.?0+$/, ""),
      );
    }
  }, [tokenValueRes.data]);

  console.log(rewardValue);

  return rewardValue;
};

export default useRewardValueDisplay;
