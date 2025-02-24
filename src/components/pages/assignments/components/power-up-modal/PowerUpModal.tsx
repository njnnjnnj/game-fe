import React from "react";

import Image from "next/image";

import classNames from "classnames";
import { motion } from "framer-motion";

import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BackgroundImage from "@/public/assets/png/assignments/specail.png";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";

export const PowerUpModal = () => {
  const { handleSelectionChanged } = useHapticFeedback();

  return (
    <DrawerContent className="flex aspect-[13/20] w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose asChild className="absolute right-4 top-4 z-10">
        <CloseIcon onClick={() => handleSelectionChanged()} />
      </DrawerClose>

      <div className="absolute inset-0 z-0">
        <Image src={BackgroundImage} alt="" fill objectFit="cover" priority />
      </div>

      <div className="z-10 mb-6 mt-auto flex flex-col items-center gap-3">
        <div
          className={classNames(
            "text-stroke-half mx-auto flex items-center gap-2 self-start rounded-full bg-[#76432B] px-3 py-1 text-xs font-extrabold uppercase text-shadow-sm",
          )}
        >
          <StarSVG className="size-4" />
          Специальное предложение
        </div>
        <DrawerTitle>
          <div className="text-stroke-1 px-5 text-center font-rubik text-[28px] font-black leading-none text-white text-shadow">
            Получи 15.000 спинов по супер скидке!
          </div>
        </DrawerTitle>
        <DrawerDescription asChild>
          <p className="text-center text-xs font-medium tracking-wide text-gray-550">
            Complete a daily Stars transaction and receive massive rewards
          </p>
        </DrawerDescription>
      </div>
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={classNames(
          "group z-10 h-[58px] w-full cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#A6552D] pb-[3px]",
        )}
      >
        <div
          className={classNames(
            "shadow-inner-btn flex h-13 w-full items-center justify-center rounded-xl bg-[#EFC609] p-[3px] pb-1",
          )}
        >
          <div
            className={classNames(
              "shadow-a flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#F7DE2D] p-3 text-center font-black uppercase tracking-wide",
            )}
          >
            <span className="text-stroke-half text-base font-black text-white text-shadow-sm">
              Приобрести за
            </span>
            <div className="flex items-center gap-1">
              <StarSVG className="size-[26px]" />
              <span className="text-stroke-half text-base font-black text-white text-shadow-sm">
                1000
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </DrawerContent>
  );
};
