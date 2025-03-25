import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import SwitchButtonImg from "@/public/assets/png/slot-machine/switch-btn.webp";

type Props = {
  isVip?: boolean;
  onClick: () => void;
};

export const SwitchButton: FunctionComponent<Props> = ({ isVip, onClick }) => {
  const t = useTranslations(NS.PAGES.SLOT_MACHINE.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();

  const onButtonClick = () => {
    handleSelectionChanged();
    onClick();
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="absolute inset-x-0 top-[19.5%] mx-auto h-[6%] w-[36.6%]"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onClick={onButtonClick}
    >
      <motion.div
        className="absolute inset-0"
        {...(!isVip
          ? {
              animate: {
                scale: [1, 1.06, 1, 1.03, 1, 1.015, 1],
              },
              transition: {
                duration: 0.8,
                ease: "linear",
                times: [0, 0.4, 0.65, 0.8, 0.9, 0.95, 1],
                repeat: Infinity,
                repeatDelay: 2,
              },
            }
          : null)}
      >
        <Image src={SwitchButtonImg} alt="" fill quality={100} />
        <div className="text-stroke-blue-1.5 absolute top-1/2 w-full -translate-y-1/2 text-center font-black uppercase text-white text-shadow-blue [font-size:min(3.8vw,1.7vh)]">
          {isVip ? t(NS.PAGES.SLOT_MACHINE.BASE_LABEL) : "VIP ROOM"}
        </div>
        {!isVip && (
          <div className="absolute inset-x-0 h-[calc(100%-3px)] [clip-path:polygon(0_50%,10%_0,90%_0,100%_50%,90%_100%,10%_100%)]">
            <motion.div
              className="absolute -top-[40%] h-[180%] w-[30%] origin-center rotate-[30deg] bg-card-glow-pattern"
              initial={{ rotate: "30deg", translateX: "-30%" }}
              animate={{ translateX: "350%" }}
              transition={{
                duration: 0.4,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 2.4,
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
