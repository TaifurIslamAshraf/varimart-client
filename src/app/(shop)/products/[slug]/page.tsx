import { styles } from "@/app/styles";
import AddToCart from "@/components/AddToCart";
import BuyNow from "@/components/BuyNow";
import ElectronicDesc from "@/components/ElectronicDesc";
import FoodDesc from "@/components/FoodDesc";
import ProductCarousel from "@/components/ProductSlider";
import Ratings from "@/components/Ratings";
import RelatedProduct from "@/components/RelatedProduct";

import { singleProduct } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";
import { RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  params: { slug: string };
};

const page: FC<Props> = async ({ params }) => {
  const { slug } = params;
  const product = await singleProduct(slug);
  const productInfo = product?.product;

  return (
    <div className={cn(styles.paddingX, "lg:mt-[140px] mt-[70px]")}>
      <div className="flex lg:flex-row flex-col justify-between gap-6 lg:px-6 px-0">
        <div className="bg-primary-foreground w-full flex md:flex-row flex-col justify-center">
          <div className="flex-1 md:p-4 p-1">
            <ProductCarousel images={productInfo?.images} />
          </div>
          <div className="flex-1 md:p-4 p-1 space-y-2">
            <h1 className="font-[500] md:text-2xl text-xl">
              {productInfo?.name}
            </h1>
            <div className="">
              <Ratings
                numOfRating={parseInt(productInfo?.ratings)}
                size="20px"
                space="2px"
              />
              <span> | {productInfo?.numOfReviews} Reviews</span>
            </div>
            <h1 className="text-xl font-semibold space-x-2">
              <span className="line-through">TK. {productInfo?.price}</span>
              <span>TK. {productInfo?.discountPrice}</span>
            </h1>
            <h1>
              <span className="font-[500]">Category:</span>{" "}
              <Link
                className="text-blue-400"
                href={`/products/?subcategory=${productInfo?.subcategory?._id}`}
              >
                {productInfo?.subcategory?.name}
              </Link>
            </h1>

            {productInfo?.description?.brand ? (
              <div className="space-y-1">
                <h1>
                  <span className="font-[500]">Brand:</span>{" "}
                  {productInfo?.description?.brand}
                </h1>
                <ul className="list-inside list-disc">
                  <h1 className="font-[500]">Highilight:</h1>
                  <li>
                    Warranty Period:{" "}
                    <span className="font-[500]">
                      {productInfo?.description?.warrantyPeriod}
                    </span>
                  </li>
                  <li>
                    Colour:{" "}
                    <span className="font-[500]">
                      {" "}
                      {productInfo?.description?.colors}
                    </span>
                  </li>
                  <li>
                    Country Origin:{" "}
                    <span className="font-[500]">
                      {" "}
                      {productInfo?.description?.countryOrigin}
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}

            <div className="space-y-2">
              {productInfo?.stock > 0 ? (
                <div className="flex items-center gap-2 font-[500] text-lg">
                  <Image
                    src={"/order-success.png"}
                    width={15}
                    height={15}
                    alt="in stock"
                  />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center font-[500] text-lg text-red-500">
                  <X /> <span>Out Of Stock</span>
                </div>
              )}
            </div>
            <div className="gap-4 flex flex-col">
              <AddToCart btnFull="w-auto" product={productInfo} />
              <BuyNow product={productInfo} />
            </div>
            <div className="text-xs space-y-2 pt-3">
              <h2 className="flex items-center gap-2">
                <RefreshCcw /> <span>7 Days Replacement Policy</span>
              </h2>
              <h2 className=" flex items-center gap-2">
                <Image
                  src={"/cash-on-delivery.png"}
                  alt="cash on delivery"
                  width={20}
                  height={20}
                />{" "}
                <span>Cash on Delivery Available</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-primary-foreground basis-1/3 md:p-4 p-1">
          <RelatedProduct product={product?.relatedProduct} />
        </div>
      </div>
      <div className={cn("bg-primary-foreground my-4 lg:mx-6 mx-0 py-4")}>
        {productInfo?.descriptionType === "electronics" ? (
          <ElectronicDesc
            description={productInfo?.description}
            title={productInfo?.name}
          />
        ) : (
          <FoodDesc description={productInfo?.description} />
        )}
      </div>
    </div>
  );
};

export default page;
