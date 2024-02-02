import { Button, HStack } from "@chakra-ui/react";
import Container from "@Components/Container";
import SvgInsert from "@Components/SvgInsert";

import s from "./style.module.scss";

export default function Header(): React.ReactElement {
  return (
    <header className={`${s.header}`}>
      <Container>
        <HStack justifyContent="space-between">
          <HStack>
            <Button variant="ghost">Mint</Button>
            <Button variant="ghost">Tokens</Button>
          </HStack>
          <Button bg="transparent" _hover={{ bg: "transparent" }}>
            <SvgInsert src="/branding/logo.svg" />
          </Button>
          <Button
            variant="solid"
            size="sm"
            className={s.header_connectWalletBtn}
          >
            <SvgInsert src="/icons/wallet.svg" />
            CONNECT WALLET
          </Button>
        </HStack>
      </Container>
    </header>
  );
}
