import React from "react";

import { useRive } from "@rive-app/react-canvas-lite";

export const MegaChest = () => {
  const { RiveComponent } = useRive({
    src: "/static/animations/chest1.riv",
    autoplay: true,
  });

  return <RiveComponent />;
};
