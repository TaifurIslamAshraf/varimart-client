import { MyImage } from "@/app/(dashboard)/components/CustomImg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllCustomerReviews } from "@/lib/fetch/customerReview";
import { serverUrl } from "@/lib/utils";

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
                <MyImage
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
        <CarouselPrevious className="md:flex hidden" />
        <CarouselNext className="md:flex hidden" />
      </Carousel>
    </div>
  );
};

export default CustomerReview;
