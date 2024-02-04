import { ChakraProps, Text } from "@chakra-ui/react";

interface IErrorIndicator extends ChakraProps {
  text?: string;
}

export default function ErrorIndicator({
  text,
  ...rest
}: IErrorIndicator): React.ReactElement {
  return (
    <Text color="brand.mars" {...rest} fontSize="lg">
      {text}
    </Text>
  );
}
