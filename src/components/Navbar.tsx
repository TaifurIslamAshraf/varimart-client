import { getBanners } from "@/lib/banner.data";
import { serverUrl } from "@/lib/utils";

import { Locale } from "@/app/[lang]/dictionaries";
import Image from "next/image";
import LangSwitcher from "./LangSwitcher";
import Search from "./Search";

type Props = {
  intl: any;
  lang: Locale;
};

const Navbar = async ({ intl, lang }: Props) => {
  const banners = await getBanners("topBanner");
  const topBannerImg = `${serverUrl}/${
    banners.banner[banners.banner.length - 1].image
  }`;
  return (
    <div>
      <div className="">
        {/* top banner */}
        <div className="">
          {banners && (
            <Image
              src={topBannerImg}
              alt="banner image"
              width={1400}
              height={100}
            />
          )}
        </div>

        {/* middle nav */}
        <div className="flex items-center justify-center">
          <div className="">
            <Image src={"/logo.png"} alt="shop logo" width={130} height={120} />
          </div>
          <Search intl={intl} />
          <div className="">
            <LangSwitcher lang={lang} />
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
