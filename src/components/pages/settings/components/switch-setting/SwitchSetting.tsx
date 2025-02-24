import { FC } from "react";

import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context";

type SwitchSettingProps = {
  settingKey: "sound" | "vibrations";
};

export const SwitchSetting: FC<SwitchSettingProps> = ({ settingKey }) => {
  const { settings } = useSettings();

  return (
    <div className="flex h-fit flex-grow flex-row items-center justify-end">
      <Switch
        className="h-4 w-6.5"
        checked={settings[settingKey]}
        disabled={settingKey === "sound"}
      />
    </div>
  );
};
