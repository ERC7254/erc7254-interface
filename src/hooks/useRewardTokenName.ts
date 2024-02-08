import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import { tokenMapping } from "@/utils/tokenMapping";

const useRewardTokenName = (
  tokenAddress: `0x${string}`,
): string | undefined => {
  const res = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress,
    functionName: "tokenReward",
  });

  return tokenMapping(res?.data as string);
};

export default useRewardTokenName;
