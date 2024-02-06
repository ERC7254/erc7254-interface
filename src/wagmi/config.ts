import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { blastSepolia, mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_PID;

export const config = createConfig({
  chains: [mainnet, sepolia, blastSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [blastSepolia.id]: http(),
  },
});
