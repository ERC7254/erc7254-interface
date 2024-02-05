import { Button, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import * as React from "react";
import { Connector, useConnect } from "wagmi";

interface IWalletOptions {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletOptions({
  isOpen,
  onClose,
}: IWalletOptions): React.ReactElement {
  const { connectors, connect } = useConnect();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => {
              onClose();
              connect({ connector });
            }}
          />
        ))}
      </ModalContent>
    </Modal>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}): React.ReactElement {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button variant="ghost" size="lg" disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
}
