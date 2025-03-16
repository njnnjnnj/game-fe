import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { HSPieceImage } from "@/components/hs-shared";
import { CLOTH_PIECE_CONTAINER_ID } from "@/components/pages/shop-clothes/constants";
import { NS } from "@/constants/ns";
import Close from "@/public/assets/png/close.webp";
import InventoryPlus from "@/public/assets/png/shop/inventory-plus.webp";
import { HeroClothPiece, HeroId, HeroRarity } from "@/services/heroes/types";

type Props = {
  heroId: HeroId;
  heroRarity: HeroRarity;
  clothPiece: HeroClothPiece;
  clothId: number;
  onRemoveClick: () => void;
};

const clothPieceClassName = {
  [HeroClothPiece.CHAIN]: "scale-x-[3] scale-y-[4.2] top-[10%]",
  [HeroClothPiece.HAT]: "scale-x-[1.5] scale-y-[2.1] top-[65%]",
  [HeroClothPiece.GLASS]: "scale-x-[2.3] scale-y-[3.2] top-[62%]",
  [HeroClothPiece.KIT]: "scale-x-[1.15] scale-y-[1.6] -top-[30%]",
  [HeroClothPiece.WATCH]: "scale-[10] bottom-[158%] left-[115%]",
};

export const InventoryCell: FunctionComponent<Props> = ({
  heroId,
  clothPiece,
  clothId,
  onRemoveClick,
}) => {
  const t = useTranslations(NS.PAGES.SHOP_CLOTHES.ROOT);
  const onClick = () => {
    if (!clothId) {
      const target = document.getElementById(
        CLOTH_PIECE_CONTAINER_ID[clothPiece],
      );

      if (target) {
        target.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative flex basis-1/5 flex-col gap-y-1" onClick={onClick}>
      <div className="aspect-square overflow-hidden rounded-lg border border-[#552005] bg-[#883308] pb-px">
        <div className="h-full rounded-b-lg bg-shop-inventory-bg-pattern p-1 shadow-[inset_0_-1px_0.5px_rgba(255,255,255,0.3)]">
          <div className="relative h-full overflow-hidden rounded-md bg-[#883308] shadow-card-inner-shadow">
            {clothId === 0 ? (
              <Image
                className="absolute inset-0 m-auto w-[36%]"
                src={InventoryPlus}
                alt=""
              />
            ) : (
              <>
                <div
                  className={classNames(
                    "absolute h-full w-full will-change-transform",
                    clothPieceClassName[clothPiece],
                  )}
                >
                  <HSPieceImage
                    heroId={heroId}
                    part={clothPiece}
                    clothId={clothId}
                    quality={100}
                    alt={clothPiece}
                    sizes="20vw"
                    fill
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-stroke-1 text-center text-xs font-bold tracking-wide text-white text-shadow-sm">
        {t(
          `${NS.PAGES.SHOP_CLOTHES[clothPiece.toUpperCase() as Uppercase<HeroClothPiece>]}`,
          { form: "single" },
        )}
      </div>
      {clothId !== 0 && (
        <motion.button
          className="absolute -right-1.5 -top-1.5 h-[26px] w-[26px]"
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={onRemoveClick}
        >
          <Image src={Close} width={26} height={26} alt="Next" />
        </motion.button>
      )}
    </div>
  );
};
