import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
} from "@chakra-ui/react";

import Container from "@/components/Container";

import s from "./style.module.scss";

interface ITokenDetailPage {
  id: string;
}

export default function TokenDetailPage({
  id,
}: ITokenDetailPage): React.ReactElement {
  return (
    <Container className={s.tokenDetail}>
      <Stack spacing={6}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/tokens">Tokens</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Token ID {id}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
    </Container>
  );
}
