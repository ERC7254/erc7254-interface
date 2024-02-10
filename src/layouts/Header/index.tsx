"use client";

import { Box, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import Container from "@Components/Container";
import SvgInsert from "@Components/SvgInsert";
import { useAccount } from "wagmi";

import { navList } from "@/constants/navList";
import useWindowSize from "@/hooks/common/useWindowSize";

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
          <Flex gap={2} alignItems="center">
            <IconButton
              as="a"
              href="https://github.com/ethereum/ERCs/blob/master/ERCS/erc-7254.md"
              aria-label="github"
              target="_blank"
              aspectRatio={1}
              variant="ghost"
              icon={
                <SvgInsert
                  src="/branding/github.svg"
                  className={s.githubLogo}
                />
              }
            />
            {isConnected ? <Account /> : <ConnectWalletBtn />}
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
}
