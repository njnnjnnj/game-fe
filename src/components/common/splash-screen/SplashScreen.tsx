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

import classNames from "classnames";

import LevelImage from "@/public/assets/png/battle-pass/level.webp";
import BeastImage from "@/public/assets/png/home/beast.webp";
import CupImage from "@/public/assets/png/home/cup.webp";
import FriendsImage from "@/public/assets/png/home/friends.webp";
import HeroesImage from "@/public/assets/png/home/heroes.webp";
import MapImage from "@/public/assets/png/home/map.webp";
import PacketImage from "@/public/assets/png/home/packet.webp";
import PrizeImage from "@/public/assets/png/home/prize.webp";
import ShopImage from "@/public/assets/png/home/shop.webp";
import TicketImage from "@/public/assets/png/home/ticket.webp";
import MainImage from "@/public/assets/png/main-bg.webp";
import SideLinkBg from "@/public/assets/png/side-link-bg.webp";
import ChevronImg from "@/public/assets/png/slot-machine/chevron.webp";
import ReelPaneImg from "@/public/assets/png/slot-machine/reel-pane.webp";
import ReelSideBg1 from "@/public/assets/png/slot-machine/reel-side-bg-1.webp";
import ReelSideBg2 from "@/public/assets/png/slot-machine/reel-side-bg-2.webp";
import VipSlotMachineImg from "@/public/assets/png/slot-machine/slot-machine-blue.webp";
import BaseSlotMachineImg from "@/public/assets/png/slot-machine/slot-machine-red.webp";
import SplashBg from "@/public/assets/png/splash-screen-bg.webp";

import { PreloadCurrentHeroView } from "./components/preload-current-hero-view/PreloadCurrentHeroView";
import { PreloadRareHeroGridViews } from "./components/preload-rare-hero-grid-views/PreloadRareHeroGridViews";

type ExtractedImageProps = Pick<
  ComponentProps<typeof Image>,
  "src" | "sizes" | "fill" | "quality" | "priority"
>;

type RenderingCallback = (
  key: string | number,
  onLoad: () => void,
) => ReactNode;

type PreloadItem = ExtractedImageProps | RenderingCallback;

type Props = {
  isAppDataLoading: boolean;
};

const PRELOAD_ITEMS: PreloadItem[] = [
  { src: MainImage, fill: true },
  { src: TicketImage, fill: true },
  { src: PrizeImage, fill: true },
  { src: PacketImage, fill: true },
  { src: FriendsImage, fill: true },
  { src: CupImage, fill: true },
  { src: BeastImage, fill: true },
  { src: HeroesImage, fill: true },
  { src: ShopImage, fill: true },
  { src: MapImage, fill: true },
  { src: SideLinkBg, fill: true },
  { src: BaseSlotMachineImg, fill: true, sizes: "100vw" },
  { src: VipSlotMachineImg, fill: true, sizes: "100vw" },
  { src: ReelPaneImg, fill: true, sizes: "100vw", quality: 100 },
  { src: ReelSideBg1, fill: true, sizes: "33vw", quality: 100 },
  { src: ReelSideBg2, fill: true, sizes: "33vw", quality: 100 },
  { src: ChevronImg, fill: true, sizes: "10vw", quality: 100 },
  { src: LevelImage, fill: true, sizes: "42px" },
  (key, onLoad) => <PreloadCurrentHeroView key={key} onLoad={onLoad} />,
  (key, onLoad) => <PreloadRareHeroGridViews key={key} onLoad={onLoad} />,
];

const FORCE_LOADING_TIMER = 3000;

const isRenderingCallback = (item: PreloadItem): item is RenderingCallback =>
  typeof item === "function";

export const SplashScreen: FunctionComponent<PropsWithChildren<Props>> = ({
  isAppDataLoading,
  children,
}) => {
  const [remainingCount, setRemainingCount] = useState(PRELOAD_ITEMS.length);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isAppDataLoading) {
      timerRef.current = setTimeout(() => {
        setRemainingCount(0);
        timerRef.current = undefined;
      }, FORCE_LOADING_TIMER);
    }
  }, [isAppDataLoading]);

  useEffect(() => {
    if (isLoadingFinished && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [isLoadingFinished]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-none">
      <Image
        className="object-cover"
        src={SplashBg}
        sizes="100vw"
        alt="Splash screen"
        priority
        fill
      />

      <div className="absolute bottom-[8%] mx-auto w-[68%] rounded-[14px] border-4 border-[#42DDFC] bg-[#0932A4]">
        <div className="absolute inset-0.5">
          <div
            className={classNames(
              "transition-width h-full rounded-lg bg-home-bp-btn-indicator-pattern shadow-home-bp-btn-indicator drop-shadow-home-bp-btn-indicator duration-300",
              "after:absolute after:left-0.5 after:right-0.5 after:top-0.5 after:z-30 after:h-1.5 after:rounded-t-[8px] after:bg-white after:opacity-30 after:content-['']",
            )}
            style={{
              width: `${progress}%`,
              minWidth: progress > 0 ? 1 : undefined,
            }}
            onTransitionEnd={() => {
              if (progress === 100) {
                setIsLoadingFinished(true);
              }
            }}
          />
        </div>
        <div className="font-base text-stroke-2 relative text-center font-black text-white text-shadow">{`${progress}%`}</div>
      </div>

      {!isAppDataLoading && (
        <div className="invisible absolute inset-0">
          {PRELOAD_ITEMS.map((item: PreloadItem, i: number) => {
            if (isRenderingCallback(item)) {
              return item(i, onItemLoad);
            } else {
              return <Image {...item} key={i} alt="" onLoad={onItemLoad} />;
            }
          })}
        </div>
      )}
    </div>
  ) : (
    children
  );
};
