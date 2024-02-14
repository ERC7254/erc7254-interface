import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";

const useTokenReward = (tokenAddress: `0x${string}`): string | undefined => {
  const [tokenReward, setTokenReward] = useState("");

  const res = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress as `0x${string}`,
    functionName: "tokenReward",
  });

  useEffect(() => {
    if (res.data === undefined || res.data === null || !res.data) return;
    setTokenReward((res.data as string[])[0]);
  }, [res.data]);

  return tokenReward;
};

export default useTokenReward;
