"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { serverUrl } from "@/lib/utils";
import { useGetAllBannerQuery } from "@/redux/features/banners/bannerApi";

const BannerSlider = () => {
  const { data } = useGetAllBannerQuery({});

  const allBanners = data?.banner.filter(
    (item: any) => item.bannerType !== "topBanner"
  );

  return (
    <div className="bg-primary-foreground rounded-lg">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className=""
      >
        <CarouselContent className="max-h-[320px] h-full">
          {allBanners?.map((item: any) => (
            <CarouselItem key={item._id}>
              <div className="rounded-lg w-full h-full">
                <Image
                  src={`${serverUrl}/${item.image}`}
                  alt="avater"
                  height={320}
                  width={1000}
                  className="h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
