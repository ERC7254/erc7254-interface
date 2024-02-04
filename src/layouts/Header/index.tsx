"use client";

import { Button, HStack } from "@chakra-ui/react";
import Container from "@Components/Container";
import SvgInsert from "@Components/SvgInsert";
import Link from "next/link";
import { useAccount } from "wagmi";

import { navList } from "@/constants/navList";

import { Account } from "./components/Account";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import s from "./style.module.scss";

export default function Header(): React.ReactElement {
  const { isConnected } = useAccount();

  return (
    <header className={`${s.header}`}>
      <Container>
        <HStack justifyContent="space-between">
          <HStack>
            {navList.map((navItem) => {
              return (
                <Link
                  key={navItem.name}
                  href={navItem.link}
                  className={s.header_link}
                >
                  {navItem.name}
                </Link>
              );
            })}
          </HStack>
          <Button bg="transparent" _hover={{ bg: "transparent" }}>
            <SvgInsert src="/branding/logo.svg" />
          </Button>

          {isConnected ? <Account /> : <ConnectWalletBtn />}
        </HStack>
      </Container>
    </header>
  );
}
