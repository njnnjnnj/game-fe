import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { AxiosError } from "axios";
import classNames from "classnames";
import { toast } from "sonner";

import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { updateProfileQuery, useGetProfile } from "@/services/profile/queries";
import {
  updateGetBanditQuery,
  useGetBandit,
  usePlayBandit,
  usePlayBanditJackpot,
} from "@/services/slot-machine/queries";
import {
  BanditJackpotPlayResponse,
  BanditPlayResponse,
  Face,
} from "@/services/slot-machine/types";
import { Reward, RewardShape } from "@/types/rewards";
import { ImpactStyleEnum } from "@/types/telegram";
import { formatValue } from "@/utils/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

import { BetButton } from "./components/bet-button/BetButton";
import { Chevron } from "./components/chevron/Chevron";
import { EnergyModal } from "./components/energy-modal/EnergyModal";
import { JackpotPane } from "./components/jackpot-pane/JackpotPane";
import { ReelPane } from "./components/reel-pane/ReelPane";
import { SpinButton } from "./components/spin-button/SpinButton";
import { StarsModal } from "./components/stars-modal/StarsModal";
import { SwitchButton } from "./components/switch-button/SwitchButton";
import { WinView } from "./components/win-view/WinView";

const DEFAULT_BETS = [5, 10, 15, 20, 25, 50];
const PAID_BETS = [100, 500, 1000, 2500];
const VIP_BETS = [...DEFAULT_BETS, 100, 250, 500];

const WIN_VIEW_TIMING = 500;
const REEL_STOP_INTERVAL = 1500;
const JACKPOT_UPDATE_INTERVAL = 10_000;

type StateReward = {
  type: Reward.COINS | Reward.STARS | Reward.FRIENDS;
  amount: number;
};

type Props = {
  onGetReward: (reward: RewardShape) => void;
};

export const Machine: FunctionComponent<Props> = ({ onGetReward }) => {
  const [isVip, setIsVip] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [betIndex, setBetIndex] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<StateReward>({
    type: Reward.COINS,
    amount: 0,
  });
  const [isFinalDrama, setIsFinalDrama] = useState(false);
  const [bets, setBets] = useState(DEFAULT_BETS);
  const [combination, setCombination] = useState<Face[]>([]);
  const queryClient = useQueryClient();
  const { handleImpactOccurred } = useHapticFeedback();

  const reelStopIntevalRef = useRef<NodeJS.Timeout>();
  const jackpotUpdateInterval = useRef<NodeJS.Timeout>();
  const winTimeoutRef = useRef<NodeJS.Timeout>();

  const bet = bets[betIndex];

  const { data: profile, refetch: refetchProfile } = useGetProfile();
  const { data: banditInfo, refetch: refetchBanditInfo } = useGetBandit();

  const { mutate: playBandit } = usePlayBandit();
  const { mutate: playBanditJackpot } = usePlayBanditJackpot();

  const balance = isVip ? (profile?.stars ?? 0) : (banditInfo?.balance ?? 0);

  const runBanditInfoRefetch = (refetchBeforeInterval?: boolean) => {
    if (refetchBeforeInterval) {
      refetchBanditInfo();
    }

    if (jackpotUpdateInterval.current) {
      clearInterval(jackpotUpdateInterval.current);
      jackpotUpdateInterval.current = undefined;
    }

    jackpotUpdateInterval.current = setInterval(
      refetchBanditInfo,
      JACKPOT_UPDATE_INTERVAL,
    );
  };

  useEffect(() => {
    if (combination.length < 2) {
      setIsFinalDrama(false);
      return;
    }

    const [reelFace1, reelFace2, reelFace3] = combination;

    if (reelFace1 && reelFace2 && !reelFace3 && reelFace1 === reelFace2) {
      setIsFinalDrama(true);
    }
  }, [combination]);

  useEffect(() => {
    if (isVip) {
      runBanditInfoRefetch();
    }

    return () => {
      if (isVip && jackpotUpdateInterval.current) {
        clearInterval(jackpotUpdateInterval.current);
        jackpotUpdateInterval.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVip]);

  useEffect(() => {
    let bets = DEFAULT_BETS;

    if (!isVip && banditInfo?.paid) {
      bets = bets.concat(PAID_BETS);
    } else if (isVip) {
      bets = VIP_BETS;
    }

    setBets(bets);
    setBetIndex(1);
  }, [banditInfo?.paid, isVip]);

  useEffect(
    () => () => {
      if (reelStopIntevalRef.current) {
        clearInterval(reelStopIntevalRef.current);
      }

      if (winTimeoutRef.current) {
        clearTimeout(winTimeoutRef.current);
      }
    },
    [],
  );

  const onChangeBet = () => {
    setBetIndex((prevBetIndex) =>
      prevBetIndex + 1 < bets.length ? prevBetIndex + 1 : 0,
    );
  };

  const onBalanceClick = () => {
    handleImpactOccurred(ImpactStyleEnum.LIGHT);

    setIsBalanceModalOpen(true);
  };

  const onSpin = () => {
    if (isSpinning) return;
    if (bet > balance) {
      setIsBalanceModalOpen(true);
      return;
    }

    setIsSpinning(true);
    setCombination([]);

    const updateBalance = isVip ? updateProfileQuery : updateGetBanditQuery;
    const nextBalance = balance - bet;

    updateBalance(queryClient, nextBalance);

    if (isVip) {
      runBanditInfoRefetch(true);
    }

    const onError = (error: AxiosError<{ detail: string }>) => {
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

      updateBalance(queryClient, nextBalance + bet);
    };

    const onSuccess = (
      response: BanditPlayResponse | BanditJackpotPlayResponse,
    ) => {
      const combination = [...response.combination];

      console.log(`Combination: ${combination}`);

      reelStopIntevalRef.current = setInterval(() => {
        const face = combination.shift() as Face;

        setCombination((prevValue) => {
          if (!combination.length) {
            clearInterval(reelStopIntevalRef.current);
            reelStopIntevalRef.current = undefined;

            if (!response.reward) return [...prevValue, face];

            const nextReward: StateReward = {
              type: reward.type,
              amount: 0,
            };

            if ("jackpot_reward" in response) {
              nextReward.amount += response.reward;
              nextReward.amount += response.jackpot_reward ?? 0;
              nextReward.type = Reward.STARS;
            } else {
              if (
                response.reward === Reward.COINS ||
                response.reward === Reward.FRIENDS
              ) {
                nextReward.amount += response.value as number;
                nextReward.type = response.reward;
              } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { combination, ...reward } = response;

                winTimeoutRef.current = setTimeout(() => {
                  onGetReward(reward);

                  winTimeoutRef.current = undefined;
                }, WIN_VIEW_TIMING);
              }
            }

            if (nextReward.amount > 0) {
              winTimeoutRef.current = setTimeout(() => {
                setReward(nextReward);

                if (isVip) {
                  updateBalance(queryClient, nextBalance + nextReward.amount);
                  runBanditInfoRefetch(true);
                } else {
                  refetchProfile();
                }

                winTimeoutRef.current = undefined;
              }, WIN_VIEW_TIMING);
            }
          }

          return [...prevValue, face];
        });

        if (!combination.length) {
          setIsSpinning(false);
        }
      }, REEL_STOP_INTERVAL);
    };

    if (isVip) {
      playBanditJackpot(bet, {
        onSuccess,
        onError,
      });
    } else {
      playBandit(bet, {
        onSuccess,
        onError,
      });
    }
  };

  return (
    <Drawer
      open={isBalanceModalOpen}
      onClose={() => setIsBalanceModalOpen(false)}
    >
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

            <ReelPane
              combination={combination}
              isFinalDrama={isFinalDrama}
              isSpinning={isSpinning}
            />

            <Chevron
              isSpinning={isSpinning}
              isSlowSpinning={!combination[2] && isFinalDrama}
            />

            <Chevron
              isSpinning={isSpinning}
              isSlowSpinning={!combination[2] && isFinalDrama}
              isRight
            />

            <SpinButton isVip={isVip} onSpinClick={onSpin} />

            <BetButton bet={bet} onClick={onChangeBet} />
            {/* Balance */}
            <div
              className="absolute left-[3%] top-[81.8%] h-[6%] w-[27.4%]"
              onClick={onBalanceClick}
            >
              <div className="text-stroke-2 absolute right-[10%] top-[45%] flex h-[64.2%] w-[45%] -translate-y-1/2 items-center justify-center font-black leading-none text-white text-shadow [container-type:inline-size] [font-size:min(3.4cqw,1.7cqh)]">
                {formatValue(balance ?? 0)}
              </div>
            </div>

            <WinView
              combination={combination}
              reward={reward.amount}
              type={reward.type}
              onClose={() => {
                setReward((prevReward) => ({ ...prevReward, amount: 0 }));
              }}
            />
          </div>
        </div>
        {isVip ? (
          <StarsModal onClose={() => setIsBalanceModalOpen(false)} />
        ) : (
          <EnergyModal
            onClose={() => setIsBalanceModalOpen(false)}
            onSuccessfulBuy={(energyAmount: number) =>
              updateGetBanditQuery(queryClient, balance + energyAmount)
            }
          />
        )}
      </div>
    </Drawer>
  );
};
