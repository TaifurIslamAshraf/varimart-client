import Navbar from "@/components/Navbar";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const shopLayout: FC<Props> = async ({ children }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default shopLayout;
