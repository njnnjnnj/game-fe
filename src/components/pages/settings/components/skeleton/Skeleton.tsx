import classNames from "classnames";

import { Level } from "@/components/ui";
import { useModalVisibility } from "@/hooks/useModalVisibility";

export const Skeleton = () => {
  const { isModalVisible } = useModalVisibility();

  return (
    <div className="h-screen w-full overflow-y-auto overscroll-contain">
      <div className="relative flex h-full flex-col pt-10">
        <div className="h-34" />
        <div className="h-full w-full">
          <div
            className={classNames(
              "h-full transform rounded-t-[32px] bg-blue-800 transition-all duration-500 ease-in-out",
              isModalVisible ? "translate-y-0" : "translate-y-20",
            )}
          >
            <div
              className={classNames(
                "relative flex flex-col items-center p-4 pt-[78px]",
              )}
            >
              <div className="absolute -top-[50px] left-1/2 size-25 -translate-x-1/2 animate-pulse rounded-full border-2 border-solid border-white bg-gray-300 object-cover" />
              <div className="mb-5 h-8 w-34 animate-pulse rounded-2xl bg-gray-300 text-3xl" />
              <div className="mb-5 flex items-center justify-center">
                <div className="relative left-1 z-10 h-6 w-[40.8px] animate-pulse">
                  <Level className="h-6 w-[40.8px]" />
                  <div className="level-text absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform font-bold -tracking-wide text-white" />
                </div>
                <div className="relative h-2.5 w-25 bg-blue-900">
                  <div className="transition-width absolute h-full animate-pulse bg-gradient-to-b from-[#F9E50F] via-[#F9E50F] to-[#EFC609] shadow-green-shadow duration-300" />
                </div>
                <div className="relative -left-1 z-10 h-6 w-[40.8px] animate-pulse">
                  <Level className="h-6 w-[40.8px]" />
                  <p className="level-text absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-[14.4px] font-bold -tracking-wide text-white" />
                </div>
              </div>
              <div
                className={classNames(
                  "mb-6 h-14 w-full animate-pulse cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#0655a4] pb-[3px]",
                )}
              >
                <div
                  className={classNames(
                    "shadow-inner-btn flex h-full w-full items-center justify-center rounded-xl bg-[#0075ff] p-[3px] pb-1",
                  )}
                >
                  <div
                    className={classNames(
                      "shadow-a flex h-11 w-full items-center justify-center rounded-xl bg-white/20 px-5 py-3",
                    )}
                  ></div>
                </div>
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="mb-5 flex w-full items-center gap-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-gray-300" />
                <div className="ml-auto h-7 w-14 animate-pulse rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
