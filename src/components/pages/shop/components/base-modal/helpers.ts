import { NS } from "@/constants/ns";

export const getShopItemByIndex = (id: number) => {
  switch (id) {
    case 3:
      return `${NS.PAGES.SHOP.STARS_TYPE.ROOT}.${NS.PAGES.SHOP.STARS_TYPE.BAG}`;
    case 4:
      return `${NS.PAGES.SHOP.STARS_TYPE.ROOT}.${NS.PAGES.SHOP.STARS_TYPE.BUCKET}`;
    case 5:
      return `${NS.PAGES.SHOP.STARS_TYPE.ROOT}.${NS.PAGES.SHOP.STARS_TYPE.BOX}`;
    case 6:
      return `${NS.PAGES.SHOP.STARS_TYPE.ROOT}.${NS.PAGES.SHOP.STARS_TYPE.CHEST}`;
    case 7:
      return `${NS.PAGES.SHOP.STARS_TYPE.ROOT}.${NS.PAGES.SHOP.STARS_TYPE.CARRIAGE}`;
    case 8:
      return `${NS.PAGES.SHOP.STARS_TYPE.ROOT}.${NS.PAGES.SHOP.STARS_TYPE.CONTAINER}`;
  }
  return "";
};
