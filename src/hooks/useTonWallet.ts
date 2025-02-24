import { useCallback } from "react";

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

export const useTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const shortenAddress = useCallback((address: string) => {
    if (!address) return "";
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
  }, []);

  const handleOpenTonConnect = () => {
    tonConnectUI.openModal();
  };

  const handleDisconnectTonConnect = () => {
    tonConnectUI.disconnect();
  };

  return {
    address,
    shortenAddress,
    handleOpenTonConnect,
    handleDisconnectTonConnect,
  };
};
