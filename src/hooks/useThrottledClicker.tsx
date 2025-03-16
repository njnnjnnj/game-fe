import { useEffect, useRef } from "react";

import Cookies from "js-cookie";
import throttle from "lodash.throttle";
import { toast } from "sonner";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { invalidateBattlePassQuery } from "@/services/battle-pass/queries";
import { useClicker } from "@/services/profile/queries";
import { useQueryClient } from "@tanstack/react-query";

if (typeof window !== "undefined") {
  window.clickCounter = 0;
}

export const useThrottledClicker = () => {
  const { mutate: setClicker, mutateAsync: setClickerAsync } = useClicker();
  const queryClient = useQueryClient();
  const clickCountRef = useRef(0);

  const throttledSetClicker = useRef(
    throttle(() => {
      const clicks = clickCountRef.current;

      if (clicks > 0) {
        const unixTimeInSeconds = Math.floor(Date.now() / 1000);
        const token = Cookies.get(AUTH_COOKIE_TOKEN) || "";
        clickCountRef.current -= clicks;

        setClicker(
          {
            debouncedClickCount: clicks,
            unixTimeInSeconds,
            token,
          },
          {
            onError: (error) => {
              clickCountRef.current += clicks;
              toast.error(error.message);
            },
          },
        );
      }
    }, 3000),
  ).current;

  const registerClick = () => {
    window.clickCounter++;
    clickCountRef.current += 1;
    throttledSetClicker();
  };

  const getClickCount = () => clickCountRef.current;

  useEffect(() => {
    return () => {
      const remainingClicks = clickCountRef.current;

      if (remainingClicks > 0) {
        const unixTimeInSeconds = Math.floor(Date.now() / 1000);
        const token = Cookies.get(AUTH_COOKIE_TOKEN) || "";
        clickCountRef.current -= remainingClicks;

        // Sync version does not trigger onSuccess method
        setClickerAsync({
          debouncedClickCount: remainingClicks,
          unixTimeInSeconds,
          token,
        })
          .then(() => {
            // If we go away from Home to Battle Pass, we'll need to update BP info once this request succeeds
            invalidateBattlePassQuery(queryClient);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    };
  }, [setClickerAsync, queryClient]);

  return { registerClick, getClickCount };
};
