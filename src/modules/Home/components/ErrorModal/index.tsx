import {
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { BaseError } from "wagmi";

interface IErrorModal {
  error: BaseError;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function ErrorModal({
  error,
  isOpen,
  onClose,
}: IErrorModal): React.ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Stack>
          <Text color="brand.mars">Error</Text>
          <Divider />
          {error && (
            <Text fontSize="sm">
              {(error as BaseError).shortMessage || error.message}
            </Text>
          )}
        </Stack>
      </ModalContent>
    </Modal>
  );
}
