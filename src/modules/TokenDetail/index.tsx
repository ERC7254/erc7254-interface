"use client";

import { Breadcrumb, BreadcrumbItem, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Container from "@/components/Container";
import { tokenList } from "@/constants/tokenList";
import { Link } from "@/libs/router-events";
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
        <Breadcrumb fontSize="sm">
          <BreadcrumbItem>
            <Link href="/tokens">
              <Text fontSize="sm">Tokens</Text>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem color="brand.yellow.200">
            <Link href="#">
              <Text fontSize="sm">Token ID: {id}</Text>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
      <TokenDetailHero token={foundToken} />
      <TokenDetailHistory />
    </Container>
  );
}
