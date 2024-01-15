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
    <div className="bg-primary-foreground">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-h-[320px] h-full"
      >
        <CarouselContent className="">
          {allBanners?.map((item: any) => (
            <CarouselItem key={item._id}>
              <Image
                src={`${serverUrl}/${item.image}`}
                alt="avater"
                height={320}
                width={800}
                className="w-full h-[320px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
