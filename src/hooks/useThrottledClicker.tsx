import { useEffect, useRef } from "react";

import Cookies from "js-cookie";
import throttle from "lodash.throttle";
import { toast } from "sonner";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useClicker } from "@/services/profile/queries";

export const useThrottledClicker = () => {
  const { mutate: setClicker } = useClicker();
  const clickCountRef = useRef(0);
  const bufferedClickCountRef = useRef(0);

  const throttledSetClicker = useRef(
    throttle(() => {
      const clicks = clickCountRef.current;

      if (clicks > 0) {
        const unixTimeInSeconds = Math.floor(Date.now() / 1000);
        const token = Cookies.get(AUTH_COOKIE_TOKEN) || "";
        bufferedClickCountRef.current += clicks;

        setClicker(
          {
            debouncedClickCount: clicks,
            unixTimeInSeconds,
            token,
          },
          {
            onSuccess: () => {
              clickCountRef.current -= bufferedClickCountRef.current;
              bufferedClickCountRef.current = 0;
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    }, 3000),
  ).current;

  const registerClick = () => {
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

        setClicker(
          {
            debouncedClickCount: remainingClicks,
            unixTimeInSeconds,
            token,
          },
          {
            onSuccess: () => {
              clickCountRef.current = 0;
              bufferedClickCountRef.current = 0;
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    };
  }, [setClicker]);

  return { registerClick, getClickCount };
};
