import { serverUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Ratings from "./Ratings";
import { Separator } from "./ui/separator";

type Props = {
  product: [
    {
      _id: string;
      name: string;
      price: number;
      discountPrice: string;
      ratings: number;
      numOfReviews: number;
      images: [string];
      slug: string;
    }
  ];
};

const RelatedProduct: FC<Props> = ({ product }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold">Related Product</h1>
      <div className="text-sm flex lg:flex-col flex-row gap-6 lg:gap-0  overflow-x-scroll lg:overflow-x-hidden">
        {product?.map((item) => (
          <div className="" key={item._id}>
            <Link
              className="flex items-center lg:flex-row flex-col lg:gap-4 gap-1 lg:my-4 my-4 w-[160px] lg:w-auto"
              href={item?.slug}
            >
              <div className="p-2 bg-white">
                <Image
                  src={`${serverUrl}/${item?.images[0]}`}
                  alt={item.name}
                  width={60}
                  height={60}
                />
              </div>

              <div className="space-y-1 text-center lg:text-start ">
                <h2 className="hover:text-blue-500 transition-colors">
                  {item?.name.length > 20 ? (
                    <>{item?.name.slice(0, 20)}...</>
                  ) : (
                    item?.name
                  )}
                </h2>
                <div className="">
                  <Ratings
                    numOfRating={item?.ratings}
                    size="15px"
                    space="0px"
                  />
                  ({item?.numOfReviews})
                </div>
                <h2 className="space-x-2">
                  <span className="line-through">TK.{item?.price}</span>
                  <span>TK.{item?.discountPrice}</span>
                </h2>
              </div>
            </Link>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
