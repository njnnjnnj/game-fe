import React, { FunctionComponent, useRef, useState } from "react";

import { useAnimationFrame } from "framer-motion";

import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { ImpactStyleEnum } from "@/types/telegram";

type Props = {
  className?: string;
  targetNum: number;
  withHapticFeedback?: boolean;
  startFromTarget?: boolean;
  formatter?: (value: string | number) => string | number;
  onAnimationEnd?: () => void;
};

const DURATION = 5000;
const HAPTIC_FEEDBACK_INTERVAL = 100;

export const AnimatedNumber: FunctionComponent<Props> = ({
  className,
  targetNum,
  withHapticFeedback,
  startFromTarget,
  formatter,
  onAnimationEnd,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayNum, setDisplayNum] = useState<number | string>(
    startFromTarget ? targetNum : 0,
  );
  const counter = useRef(startFromTarget ? targetNum : 0);
  const hapticFeedbackTimer = useRef(0);
  const { handleImpactOccurred } = useHapticFeedback();

  useAnimationFrame((time, delta) => {
    if (counter.current === targetNum) return;

    if (ref.current) {
      let nextAdd = Math.round(targetNum / (DURATION / delta));

      if (nextAdd < 0.1) {
        nextAdd = 0.1;
      }

      const nextNum = counter.current + nextAdd;

      if (nextNum < targetNum) {
        setDisplayNum(nextNum.toFixed());
        counter.current = nextNum;
      } else {
        setDisplayNum(targetNum);
        counter.current = targetNum;

        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }

      if (withHapticFeedback) {
        hapticFeedbackTimer.current += delta;

        if (hapticFeedbackTimer.current >= HAPTIC_FEEDBACK_INTERVAL) {
          handleImpactOccurred(ImpactStyleEnum.MEDIUM);
          hapticFeedbackTimer.current = 0;
        }
      }
    }
  });

  const value = formatter ? formatter(displayNum) : displayNum;

  return (
    <div className={className}>
      <div className="invisible">{value}</div>
      <div className="absolute top-1/2 -translate-y-1/2" ref={ref}>
        {value}
      </div>
    </div>
  );
};
