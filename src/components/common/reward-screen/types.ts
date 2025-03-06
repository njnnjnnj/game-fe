import { FunctionComponent } from "react";

export type SceneIntrinsicProps = {
  clickToggle: boolean;
  onFinishScene: () => void;
};

export type Scene<P> = {
  scene: FunctionComponent<P>;
  props: P;
  bg: string;
};
