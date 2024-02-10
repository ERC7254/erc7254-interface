import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";

const useAllowance = (
  userAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
): bigint | undefined => {
  const [allowance, setAllowance] = useState<bigint>(0n);

  const res = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress as `0x${string}`,
    functionName: "allowance",
    args: [userAddress, tokenAddress],
  });

  useEffect(() => {
    if (res.data === undefined || res.data === null || !res.data) return;
    else {
      setAllowance((res.data as bigint) / 10n ** 18n);
    }
  }, [res.data]);

  return allowance;
};

export default useAllowance;
