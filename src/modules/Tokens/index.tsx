import { Stack } from "@chakra-ui/react";

import Container from "@/components/Container";

import TokensTable from "./components/TokensTable";
import TokensTitle from "./components/TokensTitle";
import s from "./style.module.scss";

export default function TokensPage(): React.ReactElement {
  return (
    <Container className={s.tokensPage}>
      <Stack spacing={6}>
        <TokensTitle />
        <TokensTable />
      </Stack>
    </Container>
  );
}
