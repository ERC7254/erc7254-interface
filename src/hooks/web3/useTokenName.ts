import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";

const useTokenName = (tokenAddress: `0x${string}`): string | undefined => {
  const [tokenName, setTokenName] = useState("");

  const tokenNameRes = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress as `0x${string}`,
    functionName: "name",
  });

  useEffect(() => {
    if (!tokenNameRes.data) return;
    setTokenName(tokenNameRes.data as string);
  }, [tokenNameRes.data]);

  return tokenName;
};

export default useTokenName;
