import { Box } from "@chakra-ui/react";

import s from "./style.module.scss";

export default function HomePage(): React.ReactElement {
  return <Box className={`${s.container} container mx-auto`}></Box>;
}
