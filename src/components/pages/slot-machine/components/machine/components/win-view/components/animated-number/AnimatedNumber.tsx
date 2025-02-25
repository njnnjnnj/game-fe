import React, { FunctionComponent, useRef } from "react";

import { useAnimationFrame } from "framer-motion";

type Props = {
  className?: string;
  targetNum: number;
  onAnimationEnd: () => void;
};

const DURATION = 5000;

export const AnimatedNumber: FunctionComponent<Props> = ({
  className,
  targetNum,
  onAnimationEnd,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const counter = useRef(0);

  useAnimationFrame((time, delta) => {
    if (ref.current) {
      if (counter.current === targetNum) return;

      let nextAdd = Math.round(targetNum / (DURATION / delta));

      if (nextAdd < 0.05) {
        nextAdd = 0.05;
      }

      const nextNum = counter.current + nextAdd;

      if (nextNum < targetNum) {
        ref.current.innerText = nextNum.toFixed();
        counter.current = nextNum;
      } else {
        ref.current.innerText = targetNum.toString();
        counter.current = targetNum;

        onAnimationEnd();
      }
    }
  });

  return (
    <div className={className}>
      <div className="invisible">{targetNum}</div>
      <div className="absolute top-1/2 -translate-y-1/2" ref={ref}>
        {0}
      </div>
    </div>
  );
};
