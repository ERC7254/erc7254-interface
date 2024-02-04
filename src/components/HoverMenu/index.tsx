"use client";

import { Box, Button, Stack } from "@chakra-ui/react";

interface IHoverMenu {
  list: React.ReactNode[] | string[];
}

export default function HoverMenu({ list }: IHoverMenu): React.ReactElement {
  return (
    <Stack>
      <Button>Hover me</Button>

      <Box as="ul">
        {list.map((item) => {
          return (
            <Box key={item?.toString()} as="li">
              {item}
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}
