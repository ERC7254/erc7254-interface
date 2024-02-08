import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";

import { Link } from "@/libs/router-events";

interface TokenDetailBreadcrumbProps {
  tokenName?: string | `0x${string}`;
}

export default function TokenDetailBreadcrumb({
  tokenName,
}: TokenDetailBreadcrumbProps): React.ReactElement {
  return (
    <Breadcrumb fontSize="sm">
      <BreadcrumbItem>
        <Link href="/tokens">
          <Text fontSize="sm">Tokens</Text>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem color="brand.yellow.200">
        <Link href="#">
          <Text fontSize="sm">{tokenName}</Text>
        </Link>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
