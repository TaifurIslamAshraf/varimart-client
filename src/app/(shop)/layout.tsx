import Footer from "@/components/Footer";
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
      <div className={"pt-20"}>
        <Footer />
      </div>
    </div>
  );
};

export default shopLayout;
