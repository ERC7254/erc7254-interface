"use client";

import { Button, HStack, Text } from "@chakra-ui/react";
import Container from "@Components/Container";
import SvgInsert from "@Components/SvgInsert";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

import { navList } from "@/constants/navList";

import { Account } from "./components/Account";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import s from "./style.module.scss";

export default function Header(): React.ReactElement {
  const { isConnected } = useAccount();
  const pathname = usePathname();

  return (
    <header className={`${s.header}`}>
      <Container>
        <HStack justifyContent="space-between">
          <HStack gap={6}>
            {navList.map((navItem) => {
              return (
                <Link
                  href={navItem.link}
                  key={navItem.name}
                  className={`${s.header_link} ${pathname === navItem.link ? s.active : ""}`}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {navItem.name}
                  </Text>
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
