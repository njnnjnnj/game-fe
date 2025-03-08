import React, { FunctionComponent } from "react";

import { useGetProfile } from "@/services/profile/queries";

import { PreloadHeroView } from "../preload-hero-view/PreloadHeroView";

type Props = {
  onLoad: () => void;
};

export const PreloadCurrentHeroView: FunctionComponent<Props> = ({ onLoad }) => {
  const { data: profile } = useGetProfile();

  if (!profile) return null;

  const { current: heroId, ...cloth } = profile.character;

  return (
    <PreloadHeroView
      heroId={heroId}
      heroCloth={cloth}
      source="preview"
      onLoad={onLoad}
    />
  );
};
