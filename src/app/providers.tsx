"use client";

import { QueryParamProvider } from "use-query-params";
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
        <QueryParamProvider
          options={{
            skipUpdateWhenNoChange: true,
            updateType: "replaceIn",
          }}
        >
          <BlastThemeProvider cookies={"blastTheme"}>
            {children}
          </BlastThemeProvider>
        </QueryParamProvider>
      </QueryClientProviders>
    </WagmiProviders>
  );
}
