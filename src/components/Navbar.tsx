"use client";

import { cn, serverUrl } from "@/lib/utils";

import { Locale } from "@/app/[lang]/dictionaries";
import { styles } from "@/app/[lang]/styles";
import { useGetTopBannerQuery } from "@/redux/features/banners/bannerApi";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import Cart from "./Cart";
import LangSwitcher from "./LangSwitcher";
import Search from "./Search";

import { useEffect, useState } from "react";
import defaultAvater from "../../public/default-avater.jpg";

type Props = {
  intl: any;
  lang: Locale;
};

const Navbar = ({ intl, lang }: Props) => {
  const { data, isSuccess } = useGetTopBannerQuery({});
  const { user } = useSelector((state: any) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  const topBannerImg = `${serverUrl}/${
    data?.banner[data.banner.length - 1]?.image
  }`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="">
        {/* top banner */}
        <div className="">
          {isSuccess && data?.banner.length > 0 ? (
            <Image
              className="h-[50px]"
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
              {user?.fullName ? (
                <Link href={"/profile"}>
                  <Image
                    className="cursor-pointer rounded-full m-auto w-[120px] h-full object-cover"
                    src={
                      user.avatar
                        ? `${serverUrl}/${user.avatar}`
                        : defaultAvater
                    }
                    alt="default avater"
                    height={120}
                    width={120}
                  />
                </Link>
              ) : (
                <Link href={"/login"}>
                  <CircleUserRound size={30} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
