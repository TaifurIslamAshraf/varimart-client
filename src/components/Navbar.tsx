import { cn, serverUrl } from "@/lib/utils";

import { Locale } from "@/app/[lang]/dictionaries";
import { styles } from "@/app/[lang]/styles";
import Image from "next/image";
import Link from "next/link";

import { getBanners } from "@/lib/fetch/banner.data";
import { SearchIcon } from "lucide-react";
import Cart from "./Cart";
import LangSwitcher from "./LangSwitcher";
import MobileMenu from "./MobileMenu";
import Profile from "./Profile";
import Search from "./Search";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  intl: any;
  lang: Locale;
};

const Navbar = async ({ intl, lang }: Props) => {
  const banners = await getBanners("topBanner");

  const topBannerImg = `${serverUrl}/${
    banners?.banner[banners.banner.length - 1]?.image
  }`;

  return (
    <div className="overflow-x-hidden">
      <div className="fixed hidden lg:block top-0 z-50 bg-slate-200 w-full">
        {/* top banner */}
        <div className="">
          {banners && banners?.banner.length > 0 ? (
            <Image
              className="h-[50px] object-cover"
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
            "flex items-center justify-center py-5 w-full"
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
            <Profile />
          </div>
        </div>
      </div>

      {/* mobile navbar */}
      <div
        className={cn(
          styles.paddingX,
          "fixed block lg:hidden top-0 z-50 bg-slate-200 w-full py-2"
        )}
      >
        <div className="flex items-center justify-between">
          <MobileMenu lang={lang} />
          <div className="">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="shop logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <SearchIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search Your Product</DialogTitle>
              </DialogHeader>
              <Search intl={intl} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
