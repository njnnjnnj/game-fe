import React, { FunctionComponent, useEffect, useState } from "react";

import { motion } from "framer-motion";

export const Clock: FunctionComponent = () => {
  const [minuteAngle, setMinuteAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinuteAngle((prevAngle) => prevAngle + 90);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-30 h-full w-full rounded-full bg-gradient-to-b from-[#FFDE60] to-[#FABF33] p-[3px]">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
        <div className="absolute -left-[1px] size-[3.73px] rounded-r-full bg-[#883308]" />
        <div className="absolute -right-[1px] size-[3.73px] rounded-l-full bg-[#883308]" />
        <div className="absolute -bottom-[1px] size-[3.73px] -rotate-90 rounded-r-full bg-[#883308]" />
        <div className="absolute -top-[1px] size-[3.73px] rotate-90 rounded-r-full bg-[#883308]" />
        <div className="absolute bottom-1/2 h-[5.5px] w-[1.5px] rounded-full bg-[#883308]" />
        <div className="size-1 rounded-full bg-[#883308]" />
        <motion.div
          className="absolute h-[7.5px] w-[1.5px] origin-bottom rounded-full bg-[#883308]"
          style={{
            translateY: "-4px",
            translateX: "0.15px",
          }}
          animate={{ rotate: minuteAngle }}
          transition={{
            type: "spring",
            repeat: Infinity,
            damping: 8,
            stiffness: 150,
          }}
        />
      </div>
    </div>
  );
};
