import { ChakraProps, Text } from "@chakra-ui/react";

import s from "./style.module.scss";

interface IErrorMessage extends ChakraProps {
  text?: string;
}

export default function ErrorMessage({
  text,
  ...rest
}: IErrorMessage): React.ReactElement {
  return (
    <Text color="brand.mars" {...rest} fontSize="md" className={s.errorMessage}>
      {text}
    </Text>
  );
}
