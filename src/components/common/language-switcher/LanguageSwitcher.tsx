import { FunctionComponent } from "react";

import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
  route: string;
  locale?: string;
};

export const LocaleSwitcher: FunctionComponent<Props> = ({
  children,
  locale,
  route,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.replace(route, undefined, { locale });
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };

  return (
    <button onClick={handleClick} style={{ all: "unset", cursor: "pointer" }}>
      {children}
    </button>
  );
};
