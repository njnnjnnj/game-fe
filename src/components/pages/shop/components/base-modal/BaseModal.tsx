import React from "react";

import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import CloseIcon from "@/public/assets/svg/close.svg";

export const BaseModal = () => {
  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose
        asChild
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>
    </DrawerContent>
  );
};
