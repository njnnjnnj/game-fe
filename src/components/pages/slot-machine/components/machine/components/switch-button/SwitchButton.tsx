import React, { FunctionComponent } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import SwitchButtonImg from "@/public/assets/png/slot-machine/switch-btn.webp";

type Props = {
  label: string;
  onClick: () => void;
};

export const SwitchButton: FunctionComponent<Props> = ({ label, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="absolute inset-x-0 top-[19.5%] mx-auto h-[6%] w-[36.6%]"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onClick={onClick}
    >
      <Image src={SwitchButtonImg} alt="" fill quality={100} />
      <div className="text-shadow-blue text-stroke-blue-1.5 absolute top-1/2 w-full -translate-y-1/2 text-center font-black text-white [font-size:min(3.8vw,1.7vh)]">
        {label}
      </div>
    </motion.div>
  );
};
