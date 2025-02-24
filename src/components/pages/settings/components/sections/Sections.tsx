import { FC, FunctionComponent, SVGProps } from "react";

import { Section } from "./components/section/Section";

type SectionsProps = {
  items: {
    text: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    children?: React.ReactNode;
    settingKey?: "sound" | "vibrations";
    isLink?: boolean;
    onClick: () => void;
  }[];
};

export const Sections: FC<SectionsProps> = ({ items }) => {
  return (
    <div className="flex min-h-[70px] w-full flex-col gap-y-[14px]">
      {items.map(({ text, icon, children, isLink, onClick }, index) => (
        <Section
          key={index}
          text={text}
          isLink={isLink}
          icon={icon}
          onClick={onClick}
        >
          {children}
        </Section>
      ))}
    </div>
  );
};
