import { useEffect, useState } from "react";

export const useCountdownTimer = (targetEpoch: number = 0) => {
  const [timeLeft, setTimeLeft] = useState<{ h: string; m: string; s: string }>(
    {
      h: "00",
      m: "00",
      s: "00",
    },
  );

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
      const targetTime = targetEpoch
        ? new Date(targetEpoch * 1000)
        : new Date(now);

      if (!targetEpoch) {
        targetTime.setUTCHours(0, 0, 0, 0);
        targetTime.setUTCDate(targetTime.getUTCDate() + 1);
      }

      const remaining = targetTime.getTime() - now.getTime();

      const hours = String(
        Math.floor(remaining / (1000 * 60 * 60) - 3),
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((remaining % (1000 * 60)) / 1000),
      ).padStart(2, "0");

      setTimeLeft({
        h: hours,
        m: minutes,
        s: seconds,
      });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [targetEpoch]);

  return timeLeft;
};
