import { createConfig, http } from "wagmi";
import { blastSepolia, mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_PID;

export const config = createConfig({
  chains: [mainnet, sepolia, blastSepolia],
  ssr: true,
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [blastSepolia.id]: http(),
  },
});
