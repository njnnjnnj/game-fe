import React, { FunctionComponent, useRef } from "react";

import classNames from "classnames";

import {
  HeroBodyPart,
  HeroClothPiece,
  HeroId,
  HeroRarity,
  SelectedCloth,
} from "@/services/heroes/types";
import { hasHeroDefaultCloth } from "@/utils/heroes";

import { HSPieceImage } from "../hs-piece-image/HSPieceImage";

type Props = {
  className?: string;
  heroId: HeroId;
  heroRarity: HeroRarity;
  heroCloth: SelectedCloth;
  source: "grid" | "preview";
  // Be cautions with the two methods below - they may not reflect the real status.
  onLoad?: () => void;
  onError?: () => void;
};

type HeroRenderingPart = HeroClothPiece | HeroBodyPart;

const RENDERING_ORDER = {
  [HeroBodyPart.BODY]: 0,
  [HeroClothPiece.KIT]: 1,
  [HeroClothPiece.CHAIN]: 2,
  [HeroBodyPart.HEAD]: 3,
  [HeroClothPiece.HAT]: 4,
  [HeroClothPiece.GLASS]: 5,
  [HeroClothPiece.WATCH]: 6,
};

const isHeroBodyPart = (
  part: HeroClothPiece | HeroBodyPart,
): part is HeroBodyPart =>
  part === HeroBodyPart.BODY || part === HeroBodyPart.HEAD;

export const HeroView: FunctionComponent<Props> = ({
  className,
  heroId,
  source,
  heroCloth,
  onLoad,
  onError,
}) => {
  const sizes = source === "grid" ? "33vw" : "50vw";

  let heroParts: HeroRenderingPart[] = [];

  const clothPieces = (Object.keys(heroCloth) as HeroClothPiece[]).filter(
    (heroClothPiece) => {
      if (!heroCloth[heroClothPiece]) {
        return hasHeroDefaultCloth(heroId, heroClothPiece);
      }

      return true;
    },
  );

  heroParts = [...Object.values(HeroBodyPart), ...clothPieces].sort(
    (a, b) => RENDERING_ORDER[a] - RENDERING_ORDER[b],
  );

  const settledRef = useRef(heroParts);
  const errorsRef = useRef<HeroRenderingPart[]>([]);

  const onSinglePieceSettle = (
    settledPart: HeroRenderingPart,
    status: "success" | "error",
  ) => {
    settledRef.current = settledRef.current.filter(
      (part) => part !== settledPart,
    );

    if (status === "error") {
      errorsRef.current.push(settledPart);
    }

    if (!settledRef.current.length) {
      if (!!errorsRef.current.length) {
        if (onError) {
          onError();
        }
      } else {
        if (onLoad) {
          onLoad();
        }
      }
    }
  };

  return (
    <div className={classNames("absolute", className)}>
      {heroParts.map((part) => (
        <HSPieceImage
          key={part}
          heroId={heroId}
          part={part}
          clothId={isHeroBodyPart(part) ? 0 : heroCloth?.[part]}
          quality={100}
          alt={part}
          sizes={sizes}
          onLoad={() => onSinglePieceSettle(part, "success")}
          onError={() => onSinglePieceSettle(part, "error")}
          fill
        />
      ))}
    </div>
  );
};
