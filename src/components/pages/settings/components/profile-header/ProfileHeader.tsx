import { FunctionComponent } from "react";

import Image from "next/image";

import HaveBPSvg from "@/public/assets/svg/have-battle-pass.svg";

type Props = {
  first_name: string;
  photo_url: string;
};

export const ProfileHeader: FunctionComponent<Props> = ({
  first_name,
  photo_url,
}) => {
  return (
    <>
      <div className="absolute -top-[50px] left-1/2 size-25 -translate-x-1/2 overflow-hidden rounded-full border-2 border-solid border-white object-cover">
        <Image
          src={photo_url}
          alt="avatar"
          fill
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      <h1 className="text-stroke-1 mb-5 flex items-center justify-center gap-2 text-center text-3xl font-black tracking-wide text-white text-shadow">
        {first_name} <HaveBPSvg className="size-5" />
      </h1>
    </>
  );
};
