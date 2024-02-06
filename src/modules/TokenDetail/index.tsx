"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Container from "@/components/Container";
import { tokenList } from "@/constants/tokenList";
import { TokenRevenueClaimable } from "@/types/token-revenue";

import TokenDetailHero from "./components/TokenDetailHero";
import TokenDetailHistory from "./components/TokenDetailHistory";
import s from "./style.module.scss";
interface ITokenDetailPage {
  id: string;
}

export default function TokenDetailPage({
  id,
}: ITokenDetailPage): React.ReactElement {
  const [foundToken, setFoundToken] = useState<TokenRevenueClaimable>();

  useEffect(() => {
    if (!foundToken) {
      setFoundToken(tokenList.find((token) => token.address === id));
    }
  }, []);

  return (
    <Container className={s.tokenDetail}>
      <Stack spacing={6}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/tokens">
              <Text fontSize="sm">Tokens</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem color="brand.yellow.200">
            <BreadcrumbLink href="#">
              <Text fontSize="sm">Token ID: {id}</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
      <TokenDetailHero token={foundToken} />
      <TokenDetailHistory />
    </Container>
  );
}
