import { styles } from "@/app/styles";
import ProductCarousel from "@/components/ProductSlider";
import Ratings from "@/components/Ratings";

import { singleProduct } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";
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
    <div className={cn(styles.paddingX, "mt-[140px]")}>
      <div className="flex justify-between gap-4">
        <div className="bg-primary-foreground w-full flex justify-center">
          <div className="bg-green-300 flex-1 p-4">
            <ProductCarousel images={productInfo?.images} />
          </div>
          <div className="flex-1 p-4">
            <h1>{productInfo?.name}</h1>
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
              <div className="">
                <h1>{productInfo?.description?.brand}</h1>
                <h1>Highilight:</h1>
                <ul className="list-inside list-disc">
                  <li>{productInfo?.description?.warrantyPeriod}</li>
                  <li>{productInfo?.description?.colors}</li>
                  <li>{productInfo?.description?.countryOrigin}</li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bg-primary-foreground basis-1/3 p-4  bg-blue-300"></div>
      </div>
    </div>
  );
};

export default page;
