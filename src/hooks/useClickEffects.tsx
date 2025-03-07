import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

import { invalidateBattlePassQuery } from "@/services/battle-pass/queries";
import { BattlePassInfo } from "@/services/battle-pass/types";
import { QueryClient } from "@tanstack/react-query";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export const useClickEffects = (
  battlePass: BattlePassInfo,
  queryClient: QueryClient,
) => {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const handleClickEffect = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      battlePassExp: number,
      setBattlePassExp: Dispatch<SetStateAction<number>>,
    ) => {
      const { clientX, clientY, currentTarget } = event;
      const rect = currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = Date.now();

      setClickEffects((prev) => [...prev, { id, x, y }]);

      if (battlePassExp === battlePass?.need_exp) {
        invalidateBattlePassQuery(queryClient);
      } else {
        setBattlePassExp((prev) => prev + 1);
      }

      timeoutRefs.current[id] = setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
        delete timeoutRefs.current[id];
      }, 1000);
    },
    [battlePass, queryClient],
  );

  return { clickEffects, handleClickEffect };
};
