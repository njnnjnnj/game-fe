import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

interface NavigationContextProps {
  previousUrl: string | null;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined,
);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      setPreviousUrl(router.asPath);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const goBack = () => {
    if (previousUrl) {
      router.push(previousUrl);
    } else {
      router.back();
    }
  };

  return (
    <NavigationContext.Provider value={{ previousUrl, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
