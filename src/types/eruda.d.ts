type Eruda = {
  tool: string[];
  useShadowDom: boolean;
  autoScale: boolean;
  defaults: {
    displaySize: number;
    transparency: number;
    theme: string;
  };
};

declare module "eruda" {
  const eruda: {
    init: (data: Eruda) => void;
  };
  export default eruda;
}
