import React, { useState } from "react";

import classNames from "classnames";

import { BucketScene } from "./components/bucket-scene/BucketScene";
import { ChestScene } from "./components/chest-scene/ChestScene";

export const RewardScreen = () => {
  const [toggle, setToggle] = useState(false);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const scenes = [ChestScene, BucketScene];

  const Scene = scenes[activeSceneIndex];

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center",
      )}
      onClick={() => {
        setToggle((prevToggle) => !prevToggle);
      }}
    >
      <div className="bg-reward-screen-chest-pattern absolute h-full w-full" />
      <div
        className={classNames(
          "duration-400 bg-reward-screen-bucket-pattern absolute h-full w-full",
          {
            "opacity-0": activeBgIndex !== 1,
            "opacity-1 transition-opacity": activeBgIndex === 1,
          },
        )}
      />
      <div
        className={classNames(
          "duration-400 reward-screen-hero-and-cloth-pattern absolute h-full w-full",
          {
            "opacity-0": activeBgIndex !== 2,
            "opacity-1 transition-opacity": activeBgIndex === 2,
          },
        )}
      />
      <div className="absolute aspect-square h-[120vh] animate-spin bg-[url('/assets/png/reward-screen/rays-bg.webp')] bg-cover bg-center [animation-duration:10s]" />
      <Scene
        key={activeSceneIndex}
        clickToggle={toggle}
        onAnimationEnd={() => {
          setActiveBgIndex((prevIndex) => prevIndex + 1);
          setActiveSceneIndex((prevIndex) => prevIndex + 1);
        }}
      />
    </div>
  );
};
