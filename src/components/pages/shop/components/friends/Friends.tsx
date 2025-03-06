import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Card, CardType } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { NS } from "@/constants/ns";
import TapeImage from "@/public/assets/png/shop/tape-4.webp";
import { ShopItem } from "@/services/shop/types";
import { formatNumber } from "@/utils/number";

import { FRIENDS_CARDS } from "../../constants";

type Props = {
  cards: ShopItem[];
  onSelect: (card: ShopItem) => void;
};

export const Friends: FunctionComponent<Props> = ({ cards, onSelect }) => {
  const t = useTranslations(NS.PAGES.SHOP.ROOT);
  const tCommon = useTranslations(NS.COMMON.ROOT);

  return (
    <>
      <div className="relative flex aspect-[9/1] items-center justify-center px-4">
        <Image src={TapeImage} alt="tape" fill />
        <span className="text-stroke-1 relative z-10 mb-1 text-2xl font-black text-white text-shadow-sm">
          {t(NS.PAGES.SHOP.BUY_FRIENDS)}
        </span>
      </div>
      <div className="relative left-1/2 mb-4 w-fit -translate-x-1/2 rounded-b-[8px] bg-black/60 px-11 py-2 pb-3 text-center text-[11px] font-semibold leading-none tracking-wide text-gray-550 shadow-[inset_0_-1px_1px_0_rgba(255,255,255,0.2),inset_0_6px_12px_0_rgba(0,0,0,0.6)]">
        {t(NS.PAGES.SHOP.EXPRESS_YOUR_MOOD)}
      </div>

      <div className="relative mb-8 grid w-full grid-cols-3 gap-2">
        {cards.map((card, index) => {
          const staticCardData = FRIENDS_CARDS[index];

          return (
            <Card
              key={`buy_friends_card_${index}`}
              collectButtonProps={{
                children: tCommon(staticCardData.buttonText),
              }}
              bottomBadge={<Badge value={formatNumber(card.price)} />}
              onClick={() => onSelect(card)}
              isAnimated
              type={CardType.BLUE}
            >
              <div className="absolute h-full w-full">
                <Image src={staticCardData.image} alt="" fill />
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};
