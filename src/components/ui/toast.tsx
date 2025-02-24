import { cn } from "@/lib/utils";
import DestructiveSvg from "@/public/assets/svg/toast/destructive.svg";
import DoneSvg from "@/public/assets/svg/toast/done.svg";
import WarningSvg from "@/public/assets/svg/toast/warning.svg";

const MAP_ICONS_BY_TYPE = {
  destructive: DestructiveSvg,
  done: DoneSvg,
  warning: WarningSvg,
};

type Props = {
  type: keyof typeof MAP_ICONS_BY_TYPE;
  text: string;
};

export const Toast = ({ type, text }: Props) => {
  const Icon = MAP_ICONS_BY_TYPE[type];

  return (
    <div
      className={cn(
        "grid grid-cols-[16px_1fr] items-center gap-3 text-sm font-medium tracking-wide text-white opacity-90",
      )}
    >
      <div className="flex size-5 items-center justify-center">
        <Icon />
      </div>
      <span>{text}</span>
    </div>
  );
};
