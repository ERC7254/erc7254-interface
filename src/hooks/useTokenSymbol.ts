import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";

const useTokenSymbol = (tokenAddress: `0x${string}`): string | undefined => {
  const [tokenSymbol, setTokenSymbol] = useState("");

  const tokenSymbolRes = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress as `0x${string}`,
    functionName: "symbol",
  });

  useEffect(() => {
    if (!tokenSymbolRes.data) return;
    setTokenSymbol(tokenSymbolRes.data as string);
  }, [tokenSymbolRes.data]);

  return tokenSymbol;
};

export default useTokenSymbol;
