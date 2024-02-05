import TokenDetailPage from "@/pages/TokenDetail";

interface ITokenDetail {
  params: { id: string };
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
