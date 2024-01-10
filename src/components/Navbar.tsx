import { getBanners } from "@/lib/banner.data";
import { cn, serverUrl } from "@/lib/utils";

import { Locale } from "@/app/[lang]/dictionaries";
import { styles } from "@/app/[lang]/styles";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import LangSwitcher from "./LangSwitcher";
import Search from "./Search";

type Props = {
  intl: any;
  lang: Locale;
};

const Navbar = async ({ intl, lang }: Props) => {
  const banners = await getBanners("topBanner");
  const topBannerImg = `${serverUrl}/${
    banners.banner[banners.banner.length - 1]?.image
  }`;

  return (
    <div>
      <div className="">
        {/* top banner */}
        <div className="">
          {banners.banner.length > 0 ? (
            <Image
              src={topBannerImg}
              alt="banner image"
              width={1400}
              height={100}
              priority
            />
          ) : (
            ""
          )}
        </div>

        {/* middle nav */}
        <div
          className={cn(
            styles.paddingX,
            "flex items-center justify-center py-5 sticky w-full"
          )}
        >
          <div className="">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="shop logo"
                width={130}
                height={120}
              />
            </Link>
          </div>
          <Search intl={intl} />
          <div className="flex items-center justify-center gap-7">
            <LangSwitcher lang={lang} />
            <Cart />
            <div className="">
              <Link href={"/login"}>
                <CircleUserRound size={30} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
