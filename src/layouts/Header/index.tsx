import { Button, HStack } from "@chakra-ui/react";
import Container from "@Components/Container";
import SvgInsert from "@Components/SvgInsert";

import s from "./style.module.scss";

export default function Header(): React.ReactElement {
  return (
    <header className={`${s.header}`}>
      <Container>
        <HStack>
          <HStack>
            <Button>Mint</Button>
            <Button>Tokens</Button>
          </HStack>

          <SvgInsert src="/branding/logo.svg" />

          <Button size="sm">CONNECT WALLET</Button>
        </HStack>
      </Container>
    </header>
  );
}
