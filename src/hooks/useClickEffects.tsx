import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

import { levelupBattlePassQuery } from "@/services/battle-pass/queries";
import { BattlePassInfo } from "@/services/battle-pass/types";
import { useQueryClient } from "@tanstack/react-query";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export const useClickEffects = (
  battlePass: BattlePassInfo,
  battlePassExp: number,
  setBattlePassExp: Dispatch<SetStateAction<number>>,
) => {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const queryClient = useQueryClient();

  const handlePlusEvent = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, clientY, currentTarget } = event;
      const rect = currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = Date.now();

      setClickEffects((prev) => [...prev, { id, x, y }]);

      if (battlePassExp === battlePass?.need_exp) {
        levelupBattlePassQuery(queryClient);
      } else {
        setBattlePassExp((prev) => prev + 1);
      }

      timeoutRefs.current[id] = setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
        delete timeoutRefs.current[id];
      }, 1000);
    },
    [battlePass, battlePassExp, queryClient],
  );

  return { clickEffects, handlePlusEvent };
};
