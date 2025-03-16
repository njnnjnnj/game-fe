import TonSVG from "@/public/assets/svg/assignments/coin.svg";
import StarAssignmentSVG from "@/public/assets/svg/assignments/share.svg";
import ReactSvg from "@/public/assets/svg/assignments/task-icons/1.svg";
import FlagsSvg from "@/public/assets/svg/assignments/task-icons/2.svg";
import StarsSvg from "@/public/assets/svg/assignments/task-icons/3.svg";
import PlusSvg from "@/public/assets/svg/assignments/task-icons/4.svg";
import TelegramSVG from "@/public/assets/svg/assignments/telegram.svg";
import ThunderSVG from "@/public/assets/svg/assignments/thunder.svg";
import ChestSVG from "@/public/assets/svg/chest-light.svg";
import CoinSVG from "@/public/assets/svg/coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { TaskRewardType, TaskType } from "@/services/tasks/types";

export const ASSIGNMENTS_ICONS = {
  [TaskType.TON_PROMOTE]: TonSVG,
  [TaskType.STORIES_REPLY]: PlusSvg,
  [TaskType.ADD_TO_HOME]: ReactSvg,
  [TaskType.SOCIAL_SUB]: TelegramSVG,
  [TaskType.EMOJI_SET]: FlagsSvg,
  [TaskType.DONATE]: StarsSvg,
  [TaskType.WALLET_CONNECT]: ThunderSVG,
  [TaskType.BOOST_CHANNEL]: StarAssignmentSVG,
};

export const REWARD_ICONS = {
  [TaskRewardType.COINS]: CoinSVG,
  [TaskRewardType.CHEST]: ChestSVG,
  [TaskRewardType.STARS]: StarSVG,
};
