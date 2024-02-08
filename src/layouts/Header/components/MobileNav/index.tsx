/* eslint-disable */
"use client";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

import { INavItem } from "@/constants/navList";
import { Link } from "@/libs/router-events";

import s from "./style.module.scss";
import SvgInsert from "@/components/SvgInsert";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
interface IMobileNav {
  navList: INavItem[];
}

export default function MobileNav({ navList }: IMobileNav) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const account = useAccount();
  const { isConnected } = account;

  return (
    <Flex className={`${s.mobileNav}`} justifyContent="space-between">
      {navList.map((navItem) => {
        return (
          <Link
            href={navItem.link}
            className={`${s.mobileNav_link} ${pathname === navItem.link ? s.active : ""}`}
          >
            <VStack gap={0}>
              <SvgInsert src={navItem.logo} />
              <Text fontSize="md" fontWeight="bold">
                {navItem.name}
              </Text>
            </VStack>
          </Link>
        );
      })}

      {isConnected ? (
        <Link
          href="/profile"
          className={`${s.mobileNav_link} ${pathname === "/profile" ? s.active : ""}`}
        >
          <VStack gap={0}>
            <SvgInsert src="/icons/user.svg" />
            <Text fontSize="md" fontWeight="bold">
              Profile
            </Text>
          </VStack>
        </Link>
      ) : null}

      {/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </Flex>
  );
}
