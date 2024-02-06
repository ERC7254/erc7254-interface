import { Stack } from "@chakra-ui/react";

import Container from "@/components/Container";

import OwnedTokensTable from "./components/OwnedTokensTable";
import OwnedTokensTitle from "./components/OwnedTokensTitle";
import s from "./style.module.scss";

export default function TokensPage(): React.ReactElement {
  return (
    <Container className={s.tokensPage}>
      <Stack spacing={6}>
        <OwnedTokensTitle />
        <OwnedTokensTable />
      </Stack>
    </Container>
  );
}
