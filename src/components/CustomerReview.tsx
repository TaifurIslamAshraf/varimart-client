import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllCustomerReviews } from "@/lib/fetch/customerReview";
import { serverUrl } from "@/lib/utils";
import Image from "next/image";

const CustomerReview = async () => {
  const data = await getAllCustomerReviews();

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[680px]"
      >
        <CarouselContent>
          {data?.customerReview?.map((item: any, index: number) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="p-1">
                <Image
                  className="w-[340px] mx-auto"
                  src={`${serverUrl}/${item.image}`}
                  alt="customer review"
                  height={200}
                  width={340}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CustomerReview;
