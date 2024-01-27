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

interface Props {
  bannerType?: string;
  category?: string;
}

const BannerSlider = ({ bannerType, category }: Props) => {
  const { data } = useGetAllBannerQuery({ bannerType, category });

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
          {data?.banner?.map((item: any) => (
            <CarouselItem key={item._id}>
              <div className="rounded-lg w-full h-full">
                <Image
                  src={`${serverUrl}/${item.image}`}
                  alt="avater"
                  height={320}
                  width={2000}
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
