import {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import AssignmentsImage from "@/public/assets/png/home/assignments.webp";
import HeroesImage from "@/public/assets/png/home/heroes.webp";
import MapImage from "@/public/assets/png/home/map.webp";
import ShopImage from "@/public/assets/png/home/shop.webp";
import MainImage from "@/public/assets/png/main-bg.webp";
import SideLinkBg from "@/public/assets/png/side-link-bg.webp";
import SplashBg from "@/public/assets/png/slot-machine/bg.webp";

import { PreloadCurrentHeroView } from "./components/preload-current-hero-view/PreloadCurrentHeroView";
import { PreloadRareHeroGridViews } from "./components/preload-rare-hero-grid-views/PreloadRareHeroGridViews";

type ExtractedImageProps = Pick<
  ComponentProps<typeof Image>,
  "src" | "sizes" | "fill" | "quality"
>;

type RenderingCallback = (onLoad: () => void) => ReactNode;

type PreloadItem = ExtractedImageProps | RenderingCallback;

const PRELOAD_ITEMS: PreloadItem[] = [
  { src: MainImage, fill: true },
  { src: AssignmentsImage, fill: true },
  { src: HeroesImage, fill: true },
  { src: ShopImage, fill: true },
  { src: MapImage, fill: true },
  { src: SideLinkBg, fill: true },
  (onLoad) => <PreloadCurrentHeroView onLoad={onLoad} />,
  (onLoad) => <PreloadRareHeroGridViews onLoad={onLoad} />,
];

const FORCE_LOADING_TIMER = 100_000;

const isRenderingCallback = (item: PreloadItem): item is RenderingCallback =>
  typeof item === "function";

export const SplashScreen: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [remainingCount, setRemainingCount] = useState(PRELOAD_ITEMS.length);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setRemainingCount(0);
      timerRef.current = undefined;
    }, FORCE_LOADING_TIMER);
  }, []);

  useEffect(() => {
    if (isLoadingFinished && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [isLoadingFinished]);

  const onItemLoad = () => {
    setRemainingCount((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return 0;
    });
  };

  const progress = Math.round(
    ((PRELOAD_ITEMS.length - remainingCount) / PRELOAD_ITEMS.length) * 100,
  );

  return !isLoadingFinished ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Image src={SplashBg} sizes="100vw" alt="Splash screen" fill />

      <div className="absolute bottom-5 mx-auto h-2.5 w-1/2 rounded bg-[rgba(0,0,0,0.3)]">
        <div
          className="h-full max-w-full rounded bg-[#FFCC00] transition-[width] duration-300"
          style={{
            width: `${progress}%`,
            minWidth: progress > 0 ? 1 : undefined,
          }}
          onTransitionEnd={() => {
            if (progress === 100) {
              console.log("Loading finished!");
              setIsLoadingFinished(true);
            }
          }}
        />
        {`${progress}%`}
      </div>

      <div className="invisible absolute inset-0">
        {PRELOAD_ITEMS.map((item: PreloadItem, i: number) => {
          if (isRenderingCallback(item)) {
            return item(onItemLoad);
          } else {
            return <Image {...item} key={i} alt="" onLoad={onItemLoad} />;
          }
        })}
      </div>
    </div>
  ) : (
    children
  );
};
