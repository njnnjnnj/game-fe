import { FC } from "react";

import Link from "next/link";

import ArrowIcon from "@/public/assets/svg/arrow.svg";

type LinkItemProps = {
  href: string;
};

export const LinkItem: FC<LinkItemProps> = ({ href }) => (
  <Link
    href={href}
    className="flex h-fit flex-grow flex-row items-center justify-end"
  >
    <ArrowIcon className="size-6 fill-white" />
  </Link>
);
