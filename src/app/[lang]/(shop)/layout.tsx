import Navbar from "@/components/Navbar";
import React, { FC } from "react";
import { Locale, getDictionary } from "../dictionaries";

type Props = {
  children: React.ReactNode;
  params: { lang: Locale };
};

const shopLayout: FC<Props> = async ({ children, params: { lang } }) => {
  const intl = await getDictionary(lang);

  return (
    <div className="">
      <Navbar intl={intl} lang={lang} />
      {children}
    </div>
  );
};

export default shopLayout;
