/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from "react";

import Cookies from "js-cookie";
import throttle from "lodash.throttle";
import { toast } from "sonner";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useClicker } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";

export const useClickerHandler = (
  profile: IProfile,
  handlePlusEvent: (event: React.MouseEvent<HTMLButtonElement>) => void,
) => {
  const [energy, setEnergy] = useState(profile?.energy ?? 0);
  const [profileBalance, setProfileBalance] = useState(profile?.coins ?? 0);
  const clickCountRef = useRef(0);
  const bufferedClickCountRef = useRef(0);
  const lastClickTimeRef = useRef<number>(0);
  const { mutate: setClicker } = useClicker();

  const throttledSetClicker = useRef(
    throttle(() => {
      const clicks = clickCountRef.current;

      if (clicks > 0) {
        const unixTimeInSeconds = Math.floor(Date.now() / 1000);
        const token = Cookies.get(AUTH_COOKIE_TOKEN) || "";
        bufferedClickCountRef.current += clicks;

        setClicker(
          { debouncedClickCount: clicks, unixTimeInSeconds, token },
          {
            onSuccess: () => {
              clickCountRef.current -= bufferedClickCountRef.current;
              bufferedClickCountRef.current = 0;
            },
            onError: (error) => toast.error(error.message),
          },
        );
      }
    }, 3000),
  ).current;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (energy < (profile?.reward_per_tap ?? 1)) return;

      handlePlusEvent(event);

      setEnergy((prev) => prev - (profile?.reward_per_tap ?? 1));
      setProfileBalance(
        (prevBalance) => prevBalance + (profile?.reward_per_tap ?? 1),
      );

      clickCountRef.current += 1;
      throttledSetClicker();

      lastClickTimeRef.current = Date.now();
    },
    [energy, profile?.reward_per_tap, handlePlusEvent],
  );

  return { handleClick, energy, profileBalance, lastClickTimeRef, setEnergy };
};
