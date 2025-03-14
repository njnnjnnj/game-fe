import { NS } from "@/constants/ns";
import AutosalonImage from "@/public/assets/png/rewards/earning/autosalon.webp";
import BarbershopImage from "@/public/assets/png/rewards/earning/barbershop.webp";
import BloggerImage from "@/public/assets/png/rewards/earning/blogger.webp";
import ChargingStationsImage from "@/public/assets/png/rewards/earning/charging-stations.webp";
import ComputerClubImage from "@/public/assets/png/rewards/earning/computer-club.webp";
import ConferenceImage from "@/public/assets/png/rewards/earning/conference.webp";
import CyberSecurityImage from "@/public/assets/png/rewards/earning/cyber-security.webp";
import EducationalCoursesImage from "@/public/assets/png/rewards/earning/educational-courses.webp";
import FoodDeliveryImage from "@/public/assets/png/rewards/earning/food-delivery.webp";
import GameCompanyImage from "@/public/assets/png/rewards/earning/game-company.webp";
import GreenEnergyImage from "@/public/assets/png/rewards/earning/green-energy.webp";
import HotelImage from "@/public/assets/png/rewards/earning/hotel.webp";
import OilCompanyImage from "@/public/assets/png/rewards/earning/oil-company.webp";
import OpinionLeaderImage from "@/public/assets/png/rewards/earning/opinion-leader.webp";
import PodcasterImage from "@/public/assets/png/rewards/earning/podcaster.webp";
import PsychologistImage from "@/public/assets/png/rewards/earning/psyhologist.webp";
import RestaurantImage from "@/public/assets/png/rewards/earning/restaurant.webp";
import SatelliteInternetImage from "@/public/assets/png/rewards/earning/satellite-internet.webp";
import ShopImage from "@/public/assets/png/rewards/earning/shop.webp";
import ShoppingCenterImage from "@/public/assets/png/rewards/earning/shopping-center.webp";
import SocialMediaImage from "@/public/assets/png/rewards/earning/social-media.webp";
import StarsBankImage from "@/public/assets/png/rewards/earning/stars-bank.webp";
import StartupImage from "@/public/assets/png/rewards/earning/startup.webp";
import StreamerImage from "@/public/assets/png/rewards/earning/streamer.webp";
import SuccessfulTradingImage from "@/public/assets/png/rewards/earning/successful-trading.webp";
import TaxiImage from "@/public/assets/png/rewards/earning/taxi.webp";
import CoinSVG from "@/public/assets/svg/coin.svg";
import FriendsSVG from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { Currency, EventNames } from "@/services/rewards/types";

export const EVENTS_NAMES_TID: { [key in EventNames]: string } = {
  [EventNames.StarsBank]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.STARSBANK}`,
  [EventNames.OilCompany]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.OILCOMPANY}`,
  [EventNames.GreenEnergy]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.GREENENERGY}`,
  [EventNames.ChargingStation]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.CHARGINGSTATION}`,
  [EventNames.Psychologist]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.PSYCHOLOGIST}`,
  [EventNames.SuccessfulTrading]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.SUCCESSFULTRADING}`,
  [EventNames.Barbershop]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.BARBERSHOP}`,
  [EventNames.Streamer]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.STREAMER}`,
  [EventNames.ComputerClub]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.COMPUTERCLUB}`,
  [EventNames.GameCompany]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.GAMECOMPANY}`,
  [EventNames.Shop]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.SHOP}`,
  [EventNames.FoodDelivery]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.FOODDELIVERY}`,
  [EventNames.Restaurant]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.RESTAURANT}`,
  [EventNames.EducationalCourses]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.EDUCATIONALCOURSES}`,
  [EventNames.CyberSecurity]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.CYBERSECURITY}`,
  [EventNames.Starlink]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.STARLINK}`,
  [EventNames.Startup]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.STARTUP}`,
  [EventNames.ElecticalCommercy]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ELECTICALCOMMERCY}`,
  [EventNames.SocialNetworks]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.SOCIALNETWORKS}`,
  [EventNames.Blogging]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.BLOGGING}`,
  [EventNames.Podcaster]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.PODCASTER}`,
  [EventNames.OpinionLeader]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.OPINIONLEADER}`,
  [EventNames.Conference]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.CONFERENCE}`,
  [EventNames.Taxi]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.TAXI}`,
  [EventNames.Hotel]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.HOTEL}`,
  [EventNames.Autosalon]: `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENTS_LIST.AUTOSALON}`,
};

export const PRICE_CURRENCY_ICON = {
  [Currency.COINS]: CoinSVG,
  [Currency.FRIENDS]: FriendsSVG,
  [Currency.STARS]: StarSVG,
};

export const EVENTS_IMAGES = {
  [EventNames.StarsBank]: StarsBankImage,
  [EventNames.OilCompany]: OilCompanyImage,
  [EventNames.GreenEnergy]: GreenEnergyImage,
  [EventNames.ChargingStation]: ChargingStationsImage,
  [EventNames.Psychologist]: PsychologistImage,
  [EventNames.SuccessfulTrading]: SuccessfulTradingImage,
  [EventNames.Barbershop]: BarbershopImage,
  [EventNames.Streamer]: StreamerImage,
  [EventNames.ComputerClub]: ComputerClubImage,
  [EventNames.GameCompany]: GameCompanyImage,
  [EventNames.Shop]: ShopImage,
  [EventNames.FoodDelivery]: FoodDeliveryImage,
  [EventNames.Restaurant]: RestaurantImage,
  [EventNames.EducationalCourses]: EducationalCoursesImage,
  [EventNames.CyberSecurity]: CyberSecurityImage,
  [EventNames.Starlink]: SatelliteInternetImage,
  [EventNames.Startup]: StartupImage,
  [EventNames.ElecticalCommercy]: ShoppingCenterImage,
  [EventNames.SocialNetworks]: SocialMediaImage,
  [EventNames.Blogging]: BloggerImage,
  [EventNames.Podcaster]: PodcasterImage,
  [EventNames.OpinionLeader]: OpinionLeaderImage,
  [EventNames.Conference]: ConferenceImage,
  [EventNames.Taxi]: TaxiImage,
  [EventNames.Hotel]: HotelImage,
  [EventNames.Autosalon]: AutosalonImage,
};

export const MAX_LEVEL_CARD = 21;
