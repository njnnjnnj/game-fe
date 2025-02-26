import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import Card1 from "@/public/assets/png/slot-machine/energy/card-1.webp";
import Card2 from "@/public/assets/png/slot-machine/energy/card-2.webp";
import Card3 from "@/public/assets/png/slot-machine/energy/card-3.webp";
import Card4 from "@/public/assets/png/slot-machine/energy/card-4.webp";
import Card5 from "@/public/assets/png/slot-machine/energy/card-5.webp";
import Card6 from "@/public/assets/png/slot-machine/energy/card-6.webp";

export const CARDS = [
  { buttonText: NS.COMMON.BUY, image: Card1 },
  { buttonText: NS.COMMON.BUY, image: Card2 },
  { buttonText: NS.COMMON.BUY, image: Card3 },
  {
    buttonText: "-10%",
    buttonColor: CollectButtonColor.VIOLET,
    image: Card4,
  },
  {
    buttonText: "-10%",
    buttonColor: CollectButtonColor.VIOLET,
    image: Card5,
  },
  {
    buttonText: "-10%",
    buttonColor: CollectButtonColor.VIOLET,
    image: Card6,
  },
];
