import TokensPage from "@Modules/Tokens";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokens - Token Revenue Sharing",
  description: "Revenue token is a token that shares rewards for holders.",
};

export default function Tokens(): React.ReactElement {
  return (
    <main>
      <TokensPage />
    </main>
  );
}
