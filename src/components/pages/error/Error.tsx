import React from "react";

import { useRouter } from "next/router";

export const Error = () => {
  const {
    query: { code, message },
  } = useRouter();

  return (
    <div className="flex h-screen max-h-screen w-full flex-col items-center justify-center overflow-y-auto overscroll-contain bg-blue-800">
      <h1 className="text-stroke-1 mx-2 mb-5 text-center text-3xl font-black tracking-wide text-white text-shadow">
        Ошибка {code}: {message}
      </h1>
    </div>
  );
};
