"use client";

import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Container from "@/components/Container";
import { tokenList } from "@/constants/tokenList";
import useTokenName from "@/hooks/web3/useTokenName";
import { TokenRevenueClaimable } from "@/types/token-revenue";

import TokenDetailBreadcrumb from "./components/TokenDetailBreadcrumb";
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

  const tokenName = useTokenName(id as `0x${string}`);

  useEffect(() => {
    if (!foundToken) {
      setFoundToken(tokenList.find((token) => token.address === id));
    }
  }, []);

  return (
    <Container className={s.tokenDetail}>
      <Stack spacing={6}>
        <TokenDetailBreadcrumb tokenName={tokenName} />
        <TokenDetailHero token={foundToken} tokenAddress={id} />
        <TokenDetailHistory />
      </Stack>
    </Container>
  );
}
