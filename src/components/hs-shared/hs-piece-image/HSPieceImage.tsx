import React, {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import Image, { StaticImageData } from "next/image";

import {
  HeroBodyPart,
  HeroClothPiece,
  HeroGender,
  HeroId,
} from "@/services/heroes/types";

import * as images from "./images";

const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

const imageBuilder = (
  heroId: HeroId,
  part: HeroBodyPart | HeroClothPiece,
  heroGender?: HeroGender,
  clothId?: number,
): StaticImageData => {
  if (part === HeroBodyPart.BODY) {
    if (heroGender === HeroGender.FEMALE) return images.FemaleBody;
    return images.MaleBody;
  }

  const capitalizedPart = capitalizeFirstLetter(part);
  const endsWith = part === HeroBodyPart.HEAD ? "" : clothId;
  const imageKey = heroId + capitalizedPart + endsWith;
  // @ts-expect-error imported module
  return images[imageKey];
};

type Props = Omit<ComponentProps<typeof Image>, "src"> & {
  heroId: HeroId;
  part: HeroBodyPart | HeroClothPiece;
  heroGender?: HeroGender;
  clothId?: number;
};

export const HSPieceImage: FunctionComponent<Props> = ({
  heroId,
  part,
  clothId,
  heroGender,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const img = imageBuilder(heroId, part, heroGender, clothId ?? 0);

  useEffect(() => {
    setIsHidden(false);
  }, [heroId, part, clothId]);

  return (
    !isHidden && (
      <Image
        {...props}
        alt={props.alt} // to appease eslint
        src={img}
        onError={(e) => {
          if (!isHidden) {
            setIsHidden(true);
          }

          if (props.onError) {
            props.onError(e);
          }
        }}
      />
    )
  );
};
