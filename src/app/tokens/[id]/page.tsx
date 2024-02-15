import TokenDetailPage from "@Modules/TokenDetail";
import { Metadata } from "next";

interface ITokenDetail {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tokenAddress = params.id;

  const token = await fetch(
    `https://api.erc7254.org/api/token-detail?chainId=168587773&tokenAddress=${tokenAddress}`
  ).then((res) => res.json());

  const title = token?.data.token.name;

  return {
    title: `${title} - Token Revenue Sharing`,
    description: "",
    openGraph: {
      images: [],
    },
  };
}

export default function TokenDetail({
  params,
}: ITokenDetail): React.ReactElement {
  return (
    <main>
      <TokenDetailPage id={params.id} />
    </main>
  );
}
