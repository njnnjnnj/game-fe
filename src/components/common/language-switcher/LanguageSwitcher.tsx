import { FunctionComponent } from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const LocaleSwitcher: FunctionComponent<Props> = ({
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} style={{ all: "unset", cursor: "pointer" }}>
      {children}
    </button>
  );
};
