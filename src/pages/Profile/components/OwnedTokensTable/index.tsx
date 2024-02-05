import { Stack, Text } from "@chakra-ui/react";

import Container from "@/components/Container";

import s from "./style.module.scss";

export default function OwnedTokensTable(): React.ReactElement {
  return (
    <Container className={s.ownedTokens}>
      <Stack spacing={6}>
        <Text>Owned Tokens</Text>
      </Stack>
    </Container>
  );
}
