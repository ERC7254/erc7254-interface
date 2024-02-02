import { Box } from "@chakra-ui/react";

interface IContainer extends React.BaseHTMLAttributes<HTMLButtonElement> {}

export default function Container({
  children,
  className,
}: IContainer): React.ReactElement {
  return <Box className={`container mx-auto ${className}`}>{children}</Box>;
}
