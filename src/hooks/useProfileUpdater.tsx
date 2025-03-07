import { useEffect } from "react";

import { invalidateProfileQuery } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { QueryClient } from "@tanstack/react-query";

export const useProfileUpdater = (
  queryClient: QueryClient,
  lastClickTimeRef: number,
  setEnergy: (energy: number) => void,
  profile: IProfile,
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastClick = Date.now() - lastClickTimeRef;
      if (timeSinceLastClick >= 6000) {
        invalidateProfileQuery(queryClient).then(() => {
          if (profile) {
            setEnergy(profile.energy);
          }
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [queryClient, profile]);
};
