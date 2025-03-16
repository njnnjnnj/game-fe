import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

interface NavigationContextProps {
  history: string[];
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
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setHistory((prevHistory) => {
        if (prevHistory[prevHistory.length - 1] !== url) {
          return [...prevHistory, url];
        }
        return prevHistory;
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousPage = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      router.replace(previousPage);
    } else {
      router.back();
    }
  };

  return (
    <NavigationContext.Provider value={{ history, goBack }}>
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
