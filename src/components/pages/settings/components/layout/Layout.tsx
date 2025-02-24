import { FC, Fragment, FunctionComponent, SVGProps } from "react";

import { Sections } from "../sections/Sections";

type LayoutProps = {
  items: {
    title: string;
    items: {
      text: string;
      icon: FunctionComponent<SVGProps<SVGSVGElement>>;
      onClick: () => void;
      isLink?: boolean;
      children?: React.ReactNode;
    }[];
  }[];
};

export const Layout: FC<LayoutProps> = ({ items }) => (
  <>
    {items.map(({ title, items }, index) => (
      <Fragment key={index}>
        {index > 0 && <div className="h-px w-full rounded-full bg-white/10" />}
        <div className="flex h-fit w-full flex-col gap-y-5">
          <h2 className="text-stroke-1 text-2xl font-black tracking-wide text-shadow">
            {title}
          </h2>
          <Sections items={items} />
        </div>
      </Fragment>
    ))}
  </>
);
