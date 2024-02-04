"use client";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { truncateAddress } from "@/utils/truncateAddress";

import s from "./style.module.scss";

export function Account(): React.ReactElement {
  const { address } = useAccount();
  const [truncatedAddress, setTruncatedAddress] = useState<string>("");

  useEffect(() => {
    if (!address) return;
    setTruncatedAddress(truncateAddress(address));
  }, [address]);

  return (
    <HStack>
      <Box className={s.dot} />
      <Text fontSize="sm">{truncatedAddress}</Text>
    </HStack>
  );
}
