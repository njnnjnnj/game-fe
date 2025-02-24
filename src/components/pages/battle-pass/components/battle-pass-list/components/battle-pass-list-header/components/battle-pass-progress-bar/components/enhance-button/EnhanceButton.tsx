import React, { useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { CheckedPentagon } from "@/components/ui/svgr-icons/CheckedPentagon";
import { Pentagon } from "@/components/ui/svgr-icons/Pentagon";
import { NS } from "@/constants/ns";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";

export const EnhanceButton = () => {
  const [isChecked, setIsChecked] = useState(false);
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { buy: buyPremiumBattlePass } = useSafeStarsPayment(
    () => {
      console.log("Buying Premium BP");
    },
    () => {
      setIsChecked(true);
    },
    () => {
      setIsChecked(true);
    },
  );

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center justify-center"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onClick={() => buyPremiumBattlePass(1)}
    >
      {isChecked ? (
        <CheckedPentagon className="shrink-0" />
      ) : (
        <Pentagon className="shrink-0" />
      )}
      <span
        className={classNames(
          "text-stroke-1 absolute inset-0 z-10 text-center font-black text-white text-shadow-sm",
          {
            "leading-10": !isChecked,
            "pl-3 text-xs leading-[38px]": isChecked,
          },
        )}
      >
        {t(
          `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.IMPROVE}`,
        )}
      </span>
    </motion.div>
  );
};
