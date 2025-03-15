import { FunctionComponent } from "react";

import { Props as BucketSceneProps } from "./components/bucket-scene/BucketScene";
import { Props as ChestSceneProps } from "./components/chest-scene/ChestScene";
import { Props as FinalSceneProps } from "./components/final-scene/FinalScene";
import { Props as HeroAndClothSceneProps } from "./components/hero-n-cloth-scene/HeroAndClothScene";

export type SceneIntrinsicProps = {
  clickToggle: boolean;
  onFinishScene: () => void;
};

export type Scene<P> = {
  scene: FunctionComponent<P>;
  props: Omit<P, keyof SceneIntrinsicProps>;
  bg: string;
};

export type Scenes = (
  | Scene<ChestSceneProps>
  | Scene<BucketSceneProps>
  | Scene<HeroAndClothSceneProps>
  | Scene<FinalSceneProps>
)[];