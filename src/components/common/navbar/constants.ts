import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import AssignmentsImage from "@/public/assets/png/home/assignments.png";
import HeroesImage from "@/public/assets/png/home/heroes.png";
import MapImage from "@/public/assets/png/home/map.png";
import ShopImage from "@/public/assets/png/home/shop.png";

export const NAVBAR_ITEMS = [
  {
    href: ROUTES.SHOP,
    label: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.SHOP}`,
    image: ShopImage,
  },
  {
    href: ROUTES.HEROES,
    label: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.HEROES}`,
    image: HeroesImage,
  },
  {
    href: ROUTES.INDEX,
    label: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.HOME}`,
    image: HeroesImage,
  },
  {
    href: ROUTES.ASSIGNMENTS,
    label: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.ASSIGNMENTS}`,
    image: AssignmentsImage,
  },
  {
    href: ROUTES.TOP_PLAYERS,
    label: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.TOP}`,
    image: MapImage,
  },
];
