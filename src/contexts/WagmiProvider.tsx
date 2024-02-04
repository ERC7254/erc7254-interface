"use client";
import React from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/wagmi/config";

type ProviderType = {
  children: React.ReactNode;
};

const WagmiProviders = ({ children }: ProviderType): React.ReactElement => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WagmiProviders;
