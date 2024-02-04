"use client";

import { Box, Button, useDisclosure } from "@chakra-ui/react";

import SvgInsert from "@/components/SvgInsert";

import { WalletOptions } from "../WalletOptions";
import s from "./style.module.scss";

export default function ConnectWalletBtn(): React.ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button
        variant="solid"
        size="sm"
        className={s.connectWalletBtn}
        onClick={onOpen}
      >
        <SvgInsert src="/icons/wallet.svg" />
        CONNECT WALLET
      </Button>
      <WalletOptions isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
