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
  const title = params.id;
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
