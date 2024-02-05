/* eslint-disable */
"use client";
import { Button, Card, CardFooter, TableContainer } from "@chakra-ui/react";
import { useMemo } from "react";

import CustomTable from "@/components/CustomTable";
import Pagination from "@/components/Pagination";
import { tokenList } from "@/constants/tokenList";

export default function TokensTable(): React.ReactElement {
  const columns = useMemo(
    (): any => [
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Total Supply",
        accessor: "totalSupply",
      },
      {
        Header: "Reward",
        accessor: "reward",
      },
      {
        Header: "claim",
        accessor: "claim",
        Cell: (props: any) => {
          const reward = props.row.original.reward;
          return <Button isDisabled={reward <= 0}>Claim</Button>;
        },
      },
    ],
    []
  );

  return (
    <Card>
      <TableContainer>
        <CustomTable columns={columns} data={tokenList} />
      </TableContainer>
      <CardFooter justifyContent="flex-end">
        <Pagination
          amount={20}
          onChange={(a) => {
            console.log(a);
          }}
          currentPage={1}
        />
      </CardFooter>
    </Card>
  );
}
