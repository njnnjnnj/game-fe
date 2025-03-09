import React from "react";

import { useRive } from "@rive-app/react-canvas-lite";

export const EpicChest = () => {
  const { RiveComponent } = useRive({
    src: "/static/animations/chest3.riv",
    autoplay: true,
  });

  return <RiveComponent />;
};
