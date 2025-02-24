import { createElement, FC, FunctionComponent, SVGProps } from "react";

import { motion } from "framer-motion";

import ArrowIcon from "@/public/assets/svg/arrow.svg";

type SectionProps = {
  text: string;
  children: React.ReactNode;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  onClick: () => void;
  isLink?: boolean;
};

export const Section: FC<SectionProps> = ({
  text,
  children,
  icon,
  onClick,
  isLink,
}) => (
  <motion.div
    className="flex min-h-[24px] w-full flex-row items-center justify-between gap-y-3"
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    onClick={onClick}
  >
    <div className="flex h-fit w-fit flex-row items-center gap-x-3 self-center">
      {icon && (
        <div className="flex size-7 items-center justify-center">
          {createElement(icon)}
        </div>
      )}
      <p className="text-base font-medium text-white">{text}</p>
    </div>
    {isLink ? <ArrowIcon className="size-6" /> : children}
  </motion.div>
);
