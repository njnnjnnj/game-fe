import React from "react";

import { useRive } from "@rive-app/react-canvas-lite";

export const StartChest = () => {
  const { RiveComponent } = useRive({
    src: "/static/animations/chest2.riv",
    autoplay: true,
  });

  return <RiveComponent />;
};
