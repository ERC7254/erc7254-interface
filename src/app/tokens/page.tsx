import TokensPage from "@Modules/Tokens";
// import { useQuery } from "@tanstack/react-query";
import { Metadata } from "next";
// import { NumberParam, useQueryParams } from "use-query-params";

// import tokensService from "@/httpClients";

export const metadata: Metadata = {
  title: "Tokens - Token Revenue Sharing",
  description: "Revenue token is a token that shares rewards for holders.",
};

// async function getData() {
//   const res = await fetch(
//     "http://109.123.235.30:5087/api/created-token-list?chainId=168587773&page=1&limit=10"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Tokens(): Promise<React.ReactElement> {
  // const data = await getData();
  // console.log(data.data[0]);

  return (
    <main>
      <TokensPage />
    </main>
  );
}
