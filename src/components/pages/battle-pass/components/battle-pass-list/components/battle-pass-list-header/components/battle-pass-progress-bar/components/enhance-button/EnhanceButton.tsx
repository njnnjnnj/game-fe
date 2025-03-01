import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { CheckedPentagon } from "@/components/ui/svgr-icons/CheckedPentagon";
import { Pentagon } from "@/components/ui/svgr-icons/Pentagon";
import { NS } from "@/constants/ns";
import { useGetBattlePass } from "@/services/battle-pass/queries";

type Props = {
  onClick: () => void;
};

export const EnhanceButton: FunctionComponent<Props> = ({ onClick }) => {
  const { data: battlePassInfo } = useGetBattlePass();
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);

  const isPaid = !!battlePassInfo?.is_paid;

  const handleClick = () => {
    if (!isPaid) {
      onClick();
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center justify-center"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onClick={handleClick}
    >
      {isPaid ? (
        <CheckedPentagon className="shrink-0" />
      ) : (
        <Pentagon className="shrink-0" />
      )}
      <span
        className={classNames(
          "text-stroke-1 absolute inset-0 z-10 text-center font-black text-white text-shadow-sm",
          {
            "leading-10": !isPaid,
            "pl-3 text-xs leading-[38px]": isPaid,
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
