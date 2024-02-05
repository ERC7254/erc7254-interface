"use client";
import React from "react";
import { type State, WagmiProvider } from "wagmi";

import { config } from "@/wagmi/config";

type ProviderType = {
  children: React.ReactNode;
  initialState: State;
};

const WagmiProviders = ({
  children,
  initialState,
}: ProviderType): React.ReactElement => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
};

export default WagmiProviders;
