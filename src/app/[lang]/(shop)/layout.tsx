import Navbar from "@/components/Navbar";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const shopLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default shopLayout;
