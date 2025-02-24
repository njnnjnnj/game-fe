import React, { useState } from "react";

import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { useTelegram } from "@/context";
import { useStarsPayment } from "@/services/payments/queries";
import {
  invalidateProfileQuery,
  useGetProfile,
} from "@/services/profile/queries";
import { InvoiceStatus } from "@/types/telegram";
import { useQueryClient } from "@tanstack/react-query";

type UseSafeStarsPaymentConfig = {
  buy: (starsAmount: number) => void;
  isStarsPaymentLoading: boolean;
};

export const useSafeStarsPayment = (
  buyItemFn: () => void,
  onStarsPaymentSuccess?: () => void,
  onStarsPaymentError?: () => void,
  hasCheckingBalance = true,
): UseSafeStarsPaymentConfig => {
  const queryClient = useQueryClient();
  const [isStarsPaymentLoading, setIsStarsPaymentLoading] = useState(false);
  const { webApp } = useTelegram();
  const { data: profile } = useGetProfile();
  const { mutate: buyStars } = useStarsPayment(
    (response) => {
      if (webApp) {
        try {
          webApp.openInvoice(response.url, (status) => {
            switch (status) {
              case InvoiceStatus.PAID: {
                toast(
                  <Toast
                    type="done"
                    text={`Buying stars has complete. Status: ${status}`}
                  />,
                );

                if (onStarsPaymentSuccess) {
                  onStarsPaymentSuccess();
                }

                break;
              }

              case InvoiceStatus.FAILED:
                toast(
                  <Toast
                    type="destructive"
                    text={`Buying stars has failed. Status: ${status}`}
                  />,
                );
                break;
              default:
                toast(
                  <Toast
                    type="warning"
                    text={`Buying stars has failed. Status: ${status}`}
                  />,
                );
                break;
            }
          });
        } catch (e) {
          const message = `${(e as Error).message}`;

          toast(
            <Toast
              type="warning"
              text={`Buying stars has failed. ${message}`}
            />,
          );
        } finally {
          setIsStarsPaymentLoading(false);
        }
      }
    },
    (error) => {
      toast(
        <Toast
          type="destructive"
          text={`Buying stars has failed. ${error.message}`}
        />,
      );

      if (onStarsPaymentError) {
        onStarsPaymentError();
      }

      setIsStarsPaymentLoading(false);
    },
  );

  return {
    buy: (starsAmount: number) => {
      if (hasCheckingBalance && (profile?.stars ?? 0) >= starsAmount) {
        buyItemFn();
      } else {
        setIsStarsPaymentLoading(true);

        buyStars(starsAmount, {
          onSuccess: () => {
            invalidateProfileQuery(queryClient);
          },
        });
      }
    },
    isStarsPaymentLoading,
  };
};
