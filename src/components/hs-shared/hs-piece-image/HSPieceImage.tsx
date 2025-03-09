import React, {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import Image, { StaticImageData } from "next/image";

import { HeroBodyPart, HeroClothPiece, HeroId } from "@/services/heroes/types";

import * as images from "./images";

const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

const imageBuilder = (
  heroId: HeroId,
  part: HeroBodyPart | HeroClothPiece,
  clothId?: number,
): StaticImageData => {
  const capitalizedPart = capitalizeFirstLetter(part);
  const endsWith = typeof clothId === "number" ? clothId : "";
  const imageKey = heroId + capitalizedPart + endsWith;
  // @ts-expect-error imported module
  return images[imageKey];
};

type Props = Omit<ComponentProps<typeof Image>, "src"> & {
  heroId: HeroId;
  part: HeroBodyPart | HeroClothPiece;
  clothId?: number;
};

export const HSPieceImage: FunctionComponent<Props> = ({
  heroId,
  part,
  clothId,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const img =
    part === HeroBodyPart.BODY || part === HeroBodyPart.HEAD
      ? imageBuilder(heroId, part)
      : imageBuilder(heroId, part, clothId ?? 0);

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
