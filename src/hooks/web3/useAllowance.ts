import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

const useAllowance = (
  userAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
): bigint | undefined => {
  const [allowance, setAllowance] = useState<bigint>(0n);

  const res = useReadContract({
    chainId: 168587773,
    abi: erc20Abi,
    address: "0x4200000000000000000000000000000000000022",
    functionName: "allowance",
    args: [userAddress, tokenAddress],
  });

  useEffect(() => {
    if (res.data === undefined || res.data === null || !res.data) return;
    else {
      setAllowance(res.data);
    }
  }, [res.data]);

  return allowance;
};

export default useAllowance;
