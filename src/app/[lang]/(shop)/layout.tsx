import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const shopLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default shopLayout;
