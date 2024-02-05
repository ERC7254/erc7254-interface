"use client";

import { State } from "wagmi";

import { BlastThemeProvider } from "@/contexts/BlastThemeProvider";
import QueryClientProviders from "@/contexts/QueryClientProvider";
import WagmiProviders from "@/contexts/WagmiProvider";

type ProviderType = {
  children: React.ReactNode;
  initialState: State;
};

export default function Providers({
  children,
  initialState,
}: ProviderType): React.ReactElement {
  return (
    <WagmiProviders initialState={initialState}>
      <QueryClientProviders>
        <BlastThemeProvider cookies={"blastTheme"}>
          {children}
        </BlastThemeProvider>
      </QueryClientProviders>
    </WagmiProviders>
  );
}
