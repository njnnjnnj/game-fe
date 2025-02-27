import React, { FunctionComponent } from "react";

import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

import Chevron from "@/public/assets/png/chevron.webp";
import {
  HeroClothPiece,
  HeroId,
  IHeroClothConfig,
  SelectedCloth,
} from "@/services/heroes/types";
import { useGetProfile } from "@/services/profile/queries";

import { ClothCard } from "../cloth-card/ClothCard";

import { usePrevNextButtons } from "./hooks";

type Props = {
  clothPiece: HeroClothPiece;
  clothPieceConfigs: IHeroClothConfig[];
  heroId: HeroId;
  ownCloth: number[];
  selectedHeroCloth: SelectedCloth;
  onCardClick: (clothPiece: HeroClothPiece, clothId: number) => void;
};

export const ClothCarousel: FunctionComponent<Props> = ({
  clothPiece,
  clothPieceConfigs,
  heroId,
  ownCloth,
  selectedHeroCloth,
  onCardClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    isPrevBtnDisabled,
    isNextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { data: profile } = useGetProfile();
  const configs = [...clothPieceConfigs];

  const isBlocked = (config: IHeroClothConfig) =>
    config.level_for_open > (profile?.level ?? 0);

  configs.sort(
    (configA: IHeroClothConfig, configB: IHeroClothConfig) =>
      Number(isBlocked(configA)) - Number(isBlocked(configB)),
  );

  return (
    <div className="relative -mx-4 overflow-hidden px-4 pt-2" ref={emblaRef}>
      <div className="-ml-2 flex will-change-transform">
        {configs.map((cloth) => (
          <div key={cloth.id} className="shrink-0 basis-1/3 pl-2">
            <ClothCard
              clothPiece={clothPiece}
              clothPieceConfig={cloth}
              heroId={heroId}
              isSelectedCloth={selectedHeroCloth[clothPiece] === cloth.id}
              isOwnCloth={ownCloth.includes(cloth.id)}
              isBlocked={isBlocked(cloth)}
              onCardClick={onCardClick}
            />
          </div>
        ))}
      </div>
      {!isPrevBtnDisabled && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={onPrevButtonClick}
          className="absolute inset-y-0 left-1 my-auto h-[26px] w-[26px]"
        >
          <Image
            className="absolute top-0 max-h-full rotate-180"
            src={Chevron}
            width={26}
            height={26}
            alt="Next"
          />
        </motion.button>
      )}
      {!isNextBtnDisabled && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={onNextButtonClick}
          className="absolute inset-y-0 right-1 my-auto h-[26px] w-[26px]"
        >
          <Image
            className="absolute top-0 max-h-full"
            src={Chevron}
            width={26}
            height={26}
            alt="Next"
          />
        </motion.button>
      )}
    </div>
  );
};
