"use client";
import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import SvgInsert from "@/components/SvgInsert";
import { truncateAddress } from "@/utils/truncateAddress";

import s from "./style.module.scss";

export function Account(): React.ReactElement {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [truncatedAddress, setTruncatedAddress] = useState<string>("");
  const [brandCamo300] = useToken("colors", ["brand.camo.300"]);
  const router = useRouter();

  useEffect(() => {
    if (!address) return;
    setTruncatedAddress(truncateAddress(address));
  }, [address]);

  return (
    <Popover trigger="hover" placement="bottom-end">
      <PopoverTrigger>
        <HStack className={s.address}>
          <Box className={s.dot} />
          <Text fontSize="sm">{truncatedAddress}</Text>
        </HStack>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <VStack>
            <Button
              width="full"
              justifyContent="space-between"
              variant="ghost"
              onClick={() => {
                router.push("profile");
              }}
            >
              Profile
            </Button>
            <Button
              width="full"
              justifyContent="space-between"
              variant="ghost"
              rightIcon={
                <SvgInsert src="/icons/log-out.svg" fill={brandCamo300} />
              }
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
