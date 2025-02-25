import React, { useEffect, useRef, useState } from "react";

import { AxiosError } from "axios";
import classNames from "classnames";
import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { useGetProfile } from "@/services/profile/queries";
import {
  useGetBandit,
  usePlayBandit,
  usePlayBanditJackpot,
} from "@/services/slot-machine/queries";
import { Face } from "@/services/slot-machine/types";
import { formatValue } from "@/utils/lib/utils";

import { BetButton } from "./components/bet-button/BetButton";
import { Chevron } from "./components/chevron/Chevron";
import { JackpotPane } from "./components/jackpot-pane/JackpotPane";
import { ReelPane } from "./components/reel-pane/ReelPane";
import { SpinButton } from "./components/spin-button/SpinButton";
import { SwitchButton } from "./components/switch-button/SwitchButton";
import { WinView } from "./components/win-view/WinView";

// const faces = ["chest", "booster", "bucket", "super_booster", "bag"];

// function getRandomFace() {
//   const minCeiled = Math.ceil(0);
//   const maxFloored = Math.floor(4);
//   const num = Math.floor(
//     Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
//   );

//   return faces[1];
// }

const DEFAULT_BETS = [5, 10, 15, 20, 25, 50];
const PAID_BETS = [100, 500, 1000, 2500];

const WIN_VIEW_TIMING = 500;
const REEL_STOP_INTERVAL = 1500;

export const Machine = () => {
  const [isVip, setIsVip] = useState(false);
  const [betIndex, setBetIndex] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState(0);
  const [bets, setBets] = useState(DEFAULT_BETS);
  const [combination, setCombination] = useState<Face[]>([]);

  const intervalRef = useRef<NodeJS.Timeout>();
  const winTimeoutRef = useRef<NodeJS.Timeout>();

  const bet = bets[betIndex];

  const { data: profile } = useGetProfile();
  const { data: banditInfo, refetch: refetchBanditInfo } = useGetBandit();

  const { mutate: playBandit } = usePlayBandit();
  const { mutate: playBanditJackpot } = usePlayBanditJackpot();

  useEffect(() => {
    let bets = DEFAULT_BETS;

    if (!isVip && banditInfo?.paid) {
      bets = bets.concat(PAID_BETS);
    }

    setBets(bets);

    if (!bets[betIndex]) {
      setBetIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banditInfo, isVip]);

  const onChangeBet = () => {
    setBetIndex((prevBetIndex) =>
      prevBetIndex + 1 < bets.length ? prevBetIndex + 1 : 0,
    );
  };

  const onSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCombination([]);

    const playMethod = isVip ? playBanditJackpot : playBandit;

    playMethod(bet, {
      onSuccess: (response) => {
        const combination = [...response.combination];

        console.log(`Combination: ${combination}`);

        intervalRef.current = setInterval(() => {
          const face = combination.shift() as Face;

          setCombination((prevValue) => {
            if (!combination.length) {
              clearInterval(intervalRef.current);
              intervalRef.current = undefined;

              if (response.reward > 0) {
                winTimeoutRef.current = setTimeout(() => {
                  setReward(response.reward);
                }, WIN_VIEW_TIMING);
              }
            }

            return [...prevValue, face];
          });

          if (!combination.length) {
            setIsSpinning(false);

            if ('jackpot_reward' in response) {
              refetchBanditInfo();
            }
          }
        }, REEL_STOP_INTERVAL);
      },
      onError: (error: AxiosError<{ detail: string }>) => {
        setIsSpinning(false);

        let message = error.message;

        if (error.status === 403) {
          if (error.response?.data?.detail === "wrongAmount") {
            message = "Wrong bet";
          } else {
            message = "You should buy energy";
          }
        }

        toast(
          <Toast
            type="destructive"
            text={`Bandit play has failed: ${message}`}
          />,
        );
      },
    });
  };

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;
  //   let interval: NodeJS.Timeout;
  //   let winTimeout: NodeJS.Timeout;

  //   if (isSpinning) {
  //     console.log("Fake run");

  //     new Promise<string[]>((resolve) => {
  //       timeout = setTimeout(
  //         () => resolve(Array.from({ length: 3 }).map(getRandomFace)),
  //         1000,
  //       );
  //     }).then((resp) => {
  //       const response = [...resp];
  //       console.log(`Fake response: ${response}`);

  //       interval = setInterval(() => {
  //         const face = response.shift() as Face;

  //         setCombination((prevValue) => {
  //           if (!response.length) {
  //             clearInterval(interval);

  //             const isWinCombination = new Set(resp).size === 1;

  //             if (isWinCombination) {
  //               winTimeout = setTimeout(() => {
  //                 setIsWinViewMode(true);
  //               }, 500);
  //             }
  //           }

  //           return [...prevValue, face];
  //         });

  //         if (!response.length) {
  //           setIsSpinning(false);
  //         }
  //       }, 1500);
  //     });
  //   }

  //   return () => {
  //     if (timeout) {
  //       clearTimeout(timeout);
  //     }

  //     if (interval) {
  //       clearInterval(interval);
  //     }

  //     if (winTimeout) {
  //       clearTimeout(timeout);
  //     }
  //   };
  // }, [isSpinning]);

  return (
    <div className="flex min-h-0 grow flex-col">
      <div className="mt-auto aspect-[0.51] max-h-full w-full">
        <div
          className={classNames(
            "relative h-full w-full bg-[length:100%_100%]",
            {
              "bg-[url('/assets/png/slot-machine/slot-machine-red.webp')]":
                !isVip,
              "bg-[url('/assets/png/slot-machine/slot-machine-blue.webp')]":
                isVip,
            },
          )}
        >
          <SwitchButton
            label={isVip ? "BASE" : "VIP ROOM"}
            onClick={() => setIsVip(!isVip)}
          />

          {isVip && <JackpotPane jackpot={banditInfo?.jackpot ?? 0} />}

          <ReelPane combination={combination} isSpinning={isSpinning} />

          <Chevron isSpinning={isSpinning} />

          <Chevron isSpinning={isSpinning} isRight />

          <SpinButton isVip={isVip} onSpinClick={onSpin} />

          <BetButton bet={bet} onClick={onChangeBet} />
          {/* Balance */}
          <div className="text-stroke-2 absolute left-[15.2%] top-[83.5%] w-[13%] text-center font-black leading-none text-white text-shadow [container-type:inline-size] [font-size:min(3.4cqw,1.6cqh)]">
            {isVip
              ? formatValue(profile?.stars ?? 0)
              : formatValue(banditInfo?.balance ?? 0)}
          </div>

          <WinView
            combination={combination}
            reward={reward}
            isVip={isVip}
            onClick={() => {
              setReward(0);
            }}
          />
        </div>
      </div>
    </div>
  );
};
