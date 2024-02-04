import { BlastThemeProvider } from "@/contexts/BlastThemeProvider";
import QueryClientProviders from "@/contexts/QueryClientProvider";
import WagmiProviders from "@/contexts/WagmiProvider";

type ProviderType = {
  children: React.ReactNode;
};

export default function Providers({
  children,
}: ProviderType): React.ReactElement {
  return (
    <WagmiProviders>
      <QueryClientProviders>
        <BlastThemeProvider cookies={"blastTheme"}>
          {children}
        </BlastThemeProvider>
      </QueryClientProviders>
    </WagmiProviders>
  );
}
