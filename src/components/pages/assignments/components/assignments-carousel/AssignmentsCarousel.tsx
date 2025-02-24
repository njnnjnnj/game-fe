import { FunctionComponent, useCallback, useEffect, useState } from "react";

import classNames from "classnames";
import { EmblaCarouselType } from "embla-carousel";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import StarSVG from "@/public/assets/svg/star.svg";

import { PowerUpModal } from "../power-up-modal/PowerUpModal";

const SLIDES = [
  "bg-[url('/assets/png/assignments/bg-1.webp')]",
  "bg-[url('/assets/png/assignments/bg-2.webp')]",
  "bg-[url('/assets/png/assignments/bg-3.webp')]",
  "bg-[url('/assets/png/assignments/bg-1.webp')]",
  "bg-[url('/assets/png/assignments/bg-2.webp')]",
];

type Props = {
  onSlideClick: (index: number) => void;
};

export const AssignmentsCarousel: FunctionComponent<Props> = ({
  onSlideClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ stopOnInteraction: false, stopOnMouseEnter: false }),
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  const logActiveSlide = useCallback((emblaApi: EmblaCarouselType) => {
    const activeIndex = emblaApi.selectedScrollSnap();

    setActiveSlide(activeIndex);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => logActiveSlide(emblaApi));
    }
  }, [emblaApi, logActiveSlide]);

  return (
    <Drawer>
      <section className="mx-0 mt-4 w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="ml-[calc(0.8rem_*_-1)] flex touch-action-carousel">
            {SLIDES.map((background, index) => {
              return (
                <DrawerTrigger
                  asChild
                  key={index}
                  onClick={() => onSlideClick(index)}
                >
                  <div
                    className="translate-z-0 min-w-0 flex-[0_0_90%] transform pl-3"
                    key={index}
                    onClick={() => onSlideClick(index)}
                  >
                    <div
                      className={classNames(
                        "relative z-10 overflow-hidden rounded-2xl border-2 border-solid border-white p-4 transition-opacity duration-300 ease-in-out",
                        { "opacity-30": index !== activeSlide },
                      )}
                    >
                      <div
                        className={classNames(
                          "pointer-events-none absolute inset-0 z-[1] bg-[length:100%] bg-center bg-no-repeat",
                          background,
                        )}
                      />

                      <div className="relative z-10 flex h-full w-full flex-col gap-1 pt-5.5">
                        <div
                          className={classNames(
                            "text-stroke-half flex items-center gap-2 self-start rounded-full bg-[#51A395] px-3 py-1 text-xs font-extrabold uppercase text-white text-shadow-sm",
                          )}
                        >
                          <StarSVG className="size-4" />
                          Специальное предложение
                        </div>
                        <p className="text-stroke-half mr-20 text-left !text-base font-black uppercase tracking-wider text-white text-shadow">
                          Купите 1 пакет и получите 2 бесплатно
                        </p>
                      </div>
                    </div>
                  </div>
                </DrawerTrigger>
              );
            })}
          </div>
        </div>

        <PowerUpModal />
      </section>
    </Drawer>
  );
};
