import { cn, serverUrl } from "@/lib/utils";

import { styles } from "@/app/styles";
import Image from "next/image";
import Link from "next/link";

import { getBanners } from "@/lib/fetch/banner.data";
import { SearchIcon } from "lucide-react";

import Cart from "./Cart";
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

const Navbar = async () => {
  const banners = await getBanners("topBanner");

  const topBannerImg = `${serverUrl}/${
    banners?.banner[banners?.banner?.length - 1]?.image
  }`;

  return (
    <div className="overflow-x-hidden">
      {/* top banner */}
      <div className="sticky">
        {banners && banners?.banner.length > 0 ? (
          <Image
            className="h-[50px] object-cover"
            src={topBannerImg}
            alt="banner image"
            width={1400}
            height={100}
          />
        ) : (
          ""
        )}
      </div>

      <div className="sticky hidden lg:block top-0 z-50 bg-slate-100">
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
                width={200}
                height={120}
              />
            </Link>
          </div>
          <Search searchRoute="/products" />
          <div className="flex items-center justify-center gap-7">
            <Cart />
            <Profile />
          </div>
        </div>
      </div>

      {/* mobile navbar */}
      <div
        className={cn(
          styles.paddingX,
          "sticky block lg:hidden top-0 z-50 bg-slate-200 w-full py-2"
        )}
      >
        <div className="flex items-center justify-between">
          <MobileMenu />
          <div className="">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="shop logo"
                width={130}
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
              <Search searchRoute="/products" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
