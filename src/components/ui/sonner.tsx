import { useTheme } from "next-themes";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      duration={3000}
      toastOptions={{
        classNames: {
          toast:
            "group group-[.toaster]:bg-blue-700 group-[.toaster]:top-20 group-[.toaster]:rounded-2xl group-[.toaster]:shadow-[0px_8px_12px_0px_rgba(5,22,37,0.6)] toast group-[.toaster]:text-foreground group-[.toaster]:shadow-lg group-[.toaster]:border-none",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
