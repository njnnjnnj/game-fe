import React, { useEffect, useState } from "react";

import classNames from "classnames";

import { Chevron } from "./components/chevron/Chevron";
import { EnergyBar } from "./components/energy-bar/EnergyBar";
import { MultiplierButton } from "./components/multiplier-button/MultiplierButton";
import { ReelPane } from "./components/reel-pane/ReelPane";
import { SpinButton } from "./components/spin-button/SpinButton";
import { SwitchButton } from "./components/switch-button/SwitchButton";
import { WinView } from "./components/win-view/WinView";
import { Face } from "./types";

const faces = ["chest", "booster", "bucket", "super_booster", "bag"];

function getRandomFace() {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(4);
  const num = Math.floor(
    Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
  );

  return faces[num];
}

export const Machine = () => {
  const [isVip, setIsVip] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isWinViewMode, setIsWinViewMode] = useState(false);
  const [combination, setCombination] = useState<Face[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let winTimeout: NodeJS.Timeout;

    if (isSpinning) {
      console.log("Fake run");

      new Promise<string[]>((resolve) => {
        timeout = setTimeout(
          () => resolve(Array.from({ length: 3 }).map(getRandomFace)),
          1000,
        );
      }).then((resp) => {
        const response = [...resp];
        console.log(`Fake response: ${response}`);

        interval = setInterval(() => {
          const face = response.shift() as Face;

          setCombination((prevValue) => {
            if (!response.length) {
              clearInterval(interval);

              const isWinCombination = new Set(resp).size === 1;

              if (isWinCombination) {
                winTimeout = setTimeout(() => {
                  setIsWinViewMode(true);
                }, 100);
              }
            }

            return [...prevValue, face];
          });

          if (!response.length) {
            setIsSpinning(false);
          }
        }, 500);
      });
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (interval) {
        clearInterval(interval);
      }

      if (winTimeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSpinning]);

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
          {!isVip && <EnergyBar />}
          <ReelPane combination={combination} isSpinning={isSpinning} />

          <Chevron isSpinning={isSpinning} />

          <Chevron isSpinning={isSpinning} isRight />

          <SpinButton
            isVip={isVip}
            onSpinClick={() => {
              if (!isSpinning) {
                setIsSpinning(true);
                setCombination([]);
              }
            }}
          />

          <MultiplierButton />
          {/* Balance */}
          <div className="text-stroke-2 absolute left-[17.6%] top-[83.5%] font-black leading-none text-white text-shadow [font-size:min(4.6vw,2.1vh)]">
            50
          </div>

          <WinView
            combination={combination}
            isActive={isWinViewMode}
            onClick={() => {
              setIsWinViewMode(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
