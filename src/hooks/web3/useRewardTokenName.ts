import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import { tokenMapping } from "@/utils/tokenMapping";

const useRewardTokenName = (
  tokenAddress: `0x${string}`,
): { name: string; address: string } => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const res = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress,
    functionName: "tokenReward",
  });

  useEffect(() => {
    setName(tokenMapping(res?.data as string) as string);
    setAddress((res.data as string[])?.[0]);
  }, [res.data]);

  return { name, address };
};

export default useRewardTokenName;
