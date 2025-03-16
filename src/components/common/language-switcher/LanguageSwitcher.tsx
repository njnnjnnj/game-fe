import { FunctionComponent } from "react";

import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
  locale?: string;
};

export const LocaleSwitcher: FunctionComponent<Props> = ({
  children,
  locale,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.replace(router.route, router.asPath, { locale });
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };

  return (
    <button onClick={handleClick} style={{ all: "unset", cursor: "pointer" }}>
      {children}
    </button>
  );
};
