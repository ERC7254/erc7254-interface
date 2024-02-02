import { Stack } from "@chakra-ui/react";

import Container from "@/components/Container";

import TokensTable from "./components/TokensTable";
import s from "./style.module.scss";

export default function TokensPage(): React.ReactElement {
  return (
    <Container className={s.tokensPage}>
      <Stack spacing={6}>
        <TokensTable />
      </Stack>
    </Container>
  );
}
