import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { useGetProfile } from "@/services/profile/queries";

type UseSafeCoinsPaymentConfig = (coinsAmount: number) => void;

export const useSafeCoinsPayment = (
  buyItemFn: () => void,
  onNotEnoughCoins?: () => void,
): UseSafeCoinsPaymentConfig => {
  const { data: profile } = useGetProfile();

  return (coinsAmount: number) => {
    if ((profile?.coins ?? 0) >= coinsAmount) {
      buyItemFn();
    } else {
      if (onNotEnoughCoins) {
        onNotEnoughCoins();
      }

      toast(
        <Toast
          type="destructive"
          text="Not enough Coins to complete this transaction"
        />,
      );
    }
  };
};
