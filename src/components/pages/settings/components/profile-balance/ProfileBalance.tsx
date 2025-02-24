import {
  createElement,
  FC,
  FunctionComponent,
  SVGProps,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { InviteModal } from "@/components/pages/friends/components/invite-modal/InviteModal";
import { Drawer } from "@/components/ui/drawer";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useGetShop } from "@/services/shop/queries";
import { ShopItemTypeEnum } from "@/services/shop/types";
import { formatValue } from "@/utils/lib/utils";

type ItemProps = {
  type: "coin" | "star" | "friend";
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  tidKey: string;
  value: number;
  postfix?: string;
  onOpen?: () => void;
};

export const ProfileBalance: FC<{ items: ItemProps[] }> = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetShop();
  const friendsShopItems = useMemo(
    () => data?.items.filter((item) => item.type === ShopItemTypeEnum.FRIENDS),
    [data],
  );

  return (
    <div className="relative mb-6 grid h-7 w-full grid-cols-3">
      <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
        {items.map(({ icon, tidKey, value, postfix, type }, index) => (
          <ProfileBalanceItem
            key={index}
            icon={icon}
            tidKey={tidKey}
            value={value}
            postfix={postfix}
            type={type}
            onOpen={() => setIsModalOpen(true)}
          />
        ))}
        <InviteModal
          friendsShopItems={friendsShopItems ?? []}
          onClose={() => setIsModalOpen(false)}
        />
      </Drawer>
    </div>
  );
};

const ProfileBalanceItem: FC<ItemProps> = ({
  icon,
  tidKey,
  value,
  postfix,
  type,
  onOpen,
}) => {
  const router = useRouter();
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);

  const handleClick = () => {
    if (type === "star") router.push(ROUTES.BUY_STARS);
    if (type === "friend" && onOpen) {
      onOpen();
    }
  };

  return (
    <div
      className={classNames(
        "flex h-full flex-grow flex-row items-center justify-between px-3",
        "first:border-r first:border-solid first:border-white/10 first:pl-0",
        "last:border-l last:border-solid last:border-white/10 last:pr-0",
      )}
    >
      <div
        onClick={handleClick}
        className="flex h-full w-full flex-1 flex-row items-center justify-center gap-x-[9px] transition-all active:scale-95"
      >
        {createElement(icon, {
          className: "col-span-1 row-span-2 size-8 object-contain",
        })}
        <div className="flex h-full w-fit flex-col gap-y-1">
          <p className="font-inter text-x font-medium text-gray-550 text-shadow-sm">
            {t(tidKey)}
          </p>
          <p className="text-stroke-1 text-nowrap text-base font-black tracking-[0.04em] text-white text-shadow-sm">
            {formatValue(value)} {postfix && postfix}
          </p>
        </div>
      </div>
    </div>
  );
};
