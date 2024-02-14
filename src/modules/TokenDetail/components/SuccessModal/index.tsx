import {
  Box,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface ISuccessModal {
  hash?: string;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  isReload?: boolean;
}

export default function SuccessModal({
  hash,
  isOpen,
  onClose,
  isReload,
}: ISuccessModal): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose(false);
        isReload ? window.location.reload() : null;
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <Stack>
          <Text color="brand.lime">Successfully</Text>
          <Divider />
          {hash && <Text fontSize="sm">Transaction Hash: {hash}</Text>}
          <Box
            fontSize="sm"
            color="brand.yellow.200"
            textDecoration="underline"
          >
            <Link
              target="_blank"
              href={`https://testnet.blastscan.io/tx/${hash}`}
            >
              Watch on blast scan explorer
            </Link>
          </Box>
        </Stack>
      </ModalContent>
    </Modal>
  );
}
