import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";

import { NAVBAR_ITEMS, PAGES_WITH_NAVBAR } from "./constants";

export const Navbar = () => {
  const t = useTranslations(NS.PAGES.HOME.ROOT);
  const { pathname } = useRouter();

  if (!PAGES_WITH_NAVBAR.includes(pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-20 grid w-full grid-cols-5 items-stretch">
      {NAVBAR_ITEMS.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={classNames(
            "w-full bg-blue-700 px-2.5 py-2 text-center text-xs font-extrabold text-white/30 transition-transform duration-200 text-shadow-sm",
            {
              "relative z-20 scale-110 rounded-t-md bg-gradient-to-b from-[#0A4CDE] to-[#04A0F5] !text-sm !text-white shadow-[inset_0_4px_4px_rgba(4,160,245,0.6),_inset_0_1px_0_0_rgba(4,160,245,0.8)] after:absolute after:bottom-1.5 after:left-1 after:right-1 after:top-1 after:rounded after:bg-white/20":
                pathname === item.href,
            },
          )}
        >
          <div
            className={classNames(
              "flex h-full flex-col items-center justify-center",
              {
                "!justify-end": pathname === item.href,
              },
            )}
          >
            <div
              className={classNames("transition-all duration-200", {
                "absolute -top-6 left-1/2 z-20 size-[65px] -translate-x-1/2":
                  pathname === item.href,
                "relative size-[50px]": pathname !== item.href,
              })}
            >
              <Image src={item.image} fill alt="" />
            </div>
            <span
              className={classNames("mt-1 px-4 pb-3", {
                "bg-opacity-30": pathname === item.href,
              })}
            >
              {t(item.label)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
