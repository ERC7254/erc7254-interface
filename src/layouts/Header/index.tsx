"use client";

import { Box, Button, HStack } from "@chakra-ui/react";
import Container from "@Components/Container";
import SvgInsert from "@Components/SvgInsert";
import { useAccount } from "wagmi";

import { navList } from "@/constants/navList";
import useWindowSize from "@/hooks/useWindowSize";

import { Account } from "./components/Account";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import s from "./style.module.scss";

export default function Header(): React.ReactElement {
  const { isConnected } = useAccount();
  const { isMobile } = useWindowSize();

  return (
    <Box as="header" className={`${s.header}`}>
      <Container>
        <HStack justifyContent="space-between">
          {isMobile ? (
            <MobileNav navList={navList} />
          ) : (
            <DesktopNav navList={navList} />
          )}
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            as="a"
            href="/"
          >
            <SvgInsert src="/branding/logo.svg" />
          </Button>
          {isConnected ? <Account /> : <ConnectWalletBtn />}
        </HStack>
      </Container>
    </Box>
  );
}
