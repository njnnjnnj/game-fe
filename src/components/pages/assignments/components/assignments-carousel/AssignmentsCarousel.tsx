import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useTranslations } from "next-intl";

import { AxiosError } from "axios";
import classNames from "classnames";
import { EmblaCarouselType } from "embla-carousel";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";

import { SpecialOfferModal, StarterKitModal } from "@/components/common";
import { RewardScreen } from "@/components/common/reward-screen/RewardScreen";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import ChestSVG from "@/public/assets/svg/chest-light.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import {
  invalidateProfileQuery,
  invalidateReferralQuery,
} from "@/services/profile/queries";
import { useBuyShopItem, useGetShop } from "@/services/shop/queries";
import { IBoughtItem, ShopItem, ShopItemTypeEnum } from "@/services/shop/types";
import { ChestType, Reward, RewardShape } from "@/types/rewards";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onSlideClick: (index: number) => void;
};

const boughtItemToChestReward = (
  item: IBoughtItem,
  chestType: ChestType,
): RewardShape => ({
  reward: Reward.CHEST,
  value: chestType,
  character: null,
  cloth: null,
  coffer: item.coffer,
});

export const AssignmentsCarousel: FunctionComponent<Props> = ({}) => {
  const tShop = useTranslations(NS.PAGES.SHOP.ROOT);
  const tErrors = useTranslations(NS.ERRORS.ROOT);
  const queryClient = useQueryClient();
  const { handleSelectionChanged } = useHapticFeedback();
  const [reward, setReward] = useState<RewardShape | null>(null);
  const { mutate, isPending } = useBuyShopItem();
  const { data: shopData } = useGetShop();
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

  const handleBuyShopItem = (id: number, shopItem: ShopItem) => {
    handleSelectionChanged();

    mutate(id, {
      onSuccess: (response: IBoughtItem) => {
        invalidateReferralQuery(queryClient);
        invalidateProfileQuery(queryClient);

        if (response.coffer) {
          setReward(
            boughtItemToChestReward(response, shopItem.value as ChestType),
          );
        } else {
          toast(
            <Toast
              type="done"
              text={tShop(NS.PAGES.SHOP.BOUGHT_SUCCESSFULLY)}
            />,
          );
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const tid = error.response?.data["detail"];

          toast(<Toast type="destructive" text={tErrors(tid)} />);
        }
      },
    });
  };

  const starterKitShopItems = useMemo(
    () =>
      shopData?.items.find(
        (item) => item.type === ShopItemTypeEnum.STARTER_PACK,
      ),
    [shopData],
  );

  const specialOfferShopItem = useMemo(
    () =>
      shopData?.items.find((item) => item.type === ShopItemTypeEnum.SPECIAL),
    [shopData],
  );

  return (
    <section className="mx-0 mt-4 w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="ml-[calc(0.8rem_*_-1)] flex touch-action-carousel">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="translate-z-0 min-w-0 flex-[0_0_90%] transform pl-3">
                <div
                  className={classNames(
                    "relative z-10 aspect-[2.75/1] rounded-xl bg-[#403BB7] pb-1 outline outline-1 outline-black transition-all active:scale-[0.98]",
                    { "opacity-30": activeSlide !== 0 },
                  )}
                >
                  <div className="h-full w-full rounded-xl bg-gradient-to-b from-[#9099FD] to-[#777AF0] p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]">
                    <div className="flex h-full w-full flex-col items-start rounded-xl bg-[url('/assets/png/shop/spec-offer.webp')] bg-cover bg-no-repeat p-4 shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25),inset_0_-2px_4px_0_rgba(0,0,0,0.15)]">
                      <div className="mb-2 mt-auto flex items-center justify-start gap-2 rounded-full bg-[#192632]/50 px-3 py-1">
                        <div className="flex items-center gap-1">
                          <StarSVG className="size-4" />
                          <span className="text-stroke-half text-xs font-extrabold uppercase text-white text-shadow">
                            +50.000
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChestSVG className="size-4.5" />
                          <span
                            className={classNames(
                              "text-stroke-1 text-xs font-extrabold text-shadow-sm",
                              "md:text-lg",
                            )}
                          >
                            +1
                          </span>
                        </div>
                      </div>
                      <p className="text-stroke-1 w-2/3 text-sm font-black uppercase leading-none tracking-wide text-white text-shadow">
                        {tShop(NS.PAGES.SHOP.SPECIAL_OFFER_CARD)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            {specialOfferShopItem && (
              <SpecialOfferModal
                shopItem={specialOfferShopItem}
                isLoading={isPending}
                onSubmit={() =>
                  handleBuyShopItem(
                    specialOfferShopItem.id,
                    specialOfferShopItem,
                  )
                }
              />
            )}
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <div className="translate-z-0 min-w-0 flex-[0_0_90%] transform pl-3">
                <div
                  className={classNames(
                    "relative z-10 aspect-[2.75/1] rounded-xl bg-[#403BB7] pb-1 outline outline-1 outline-black transition-all active:scale-[0.98]",
                    { "opacity-30": activeSlide !== 1 },
                  )}
                >
                  <div className="h-full w-full rounded-xl bg-gradient-to-b from-[#9099FD] to-[#777AF0] p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]">
                    <div className="flex h-full w-full flex-col items-start rounded-xl bg-[url('/assets/png/shop/starter-kit.webp')] bg-cover p-4 shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25),inset_0_-2px_4px_0_rgba(0,0,0,0.15)]">
                      <div className="mb-2 mt-auto flex items-center justify-start gap-2 rounded-full bg-[#192632]/50 px-3 py-1">
                        <div className="flex items-center gap-1">
                          <StarSVG className="size-4" />
                          <span className="text-stroke-half text-xs font-extrabold uppercase text-white text-shadow">
                            +50.000
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChestSVG className="size-4.5" />
                          <span
                            className={classNames(
                              "text-stroke-1 text-xs font-extrabold text-shadow-sm",
                              "md:text-lg",
                            )}
                          >
                            +1
                          </span>
                        </div>
                      </div>
                      <p className="text-stroke-1 w-2/4 text-sm font-black uppercase leading-none tracking-wide text-white text-shadow">
                        {tShop(NS.PAGES.SHOP.STARTER_SET_CARD)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            {starterKitShopItems && (
              <StarterKitModal
                shopItem={starterKitShopItems}
                isLoading={isPending}
                onSubmit={() =>
                  handleBuyShopItem(starterKitShopItems.id, starterKitShopItems)
                }
              />
            )}
          </Drawer>
          <div className="translate-z-0 min-w-0 flex-[0_0_90%] transform pl-3">
            <div
              className={classNames(
                "relative z-10 aspect-[2.75/1] overflow-hidden rounded-2xl border-2 border-solid border-white p-4 transition-opacity duration-300 ease-in-out",
                { "opacity-30": activeSlide !== 2 },
              )}
            >
              <div
                className={classNames(
                  "pointer-events-none absolute inset-0 z-[1] bg-[length:100%] bg-center bg-no-repeat",
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
        </div>
      </div>

      {reward && (
        <RewardScreen reward={reward} onFinish={() => setReward(null)} />
      )}
    </section>
  );
};
