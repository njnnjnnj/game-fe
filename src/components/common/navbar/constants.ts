import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import AssignmentsImage from "@/public/assets/png/home/assignments.webp";
import HeroesImage from "@/public/assets/png/home/heroes.webp";
import MapImage from "@/public/assets/png/home/map.webp";
import ShopImage from "@/public/assets/png/home/shop.webp";

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
    href: ROUTES.REWARDS,
    label: `${NS.PAGES.HOME.NAVIGATION.ROOT}.${NS.PAGES.HOME.NAVIGATION.EARNINGS}`,
    image: MapImage,
  },
];

export const PAGES_WITH_NAVBAR = [
  ROUTES.HEROES,
  ROUTES.INDEX,
  ROUTES.ASSIGNMENTS,
  ROUTES.TOP_PLAYERS,
  ROUTES.SHOP,
];
