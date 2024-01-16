import { cn, serverUrl } from "@/lib/utils";
import Image from "next/image";
import AddToCart from "./AddToCart";
import Ratings from "./Ratings";

type Props = {
  product: any;
};

const ProductCard = async ({ product }: Props) => {
  const { name, images, ratings, stock, price, discountPrice, numOfReviews } =
    product;

  const discountParsentage = ((price - discountPrice) / price) * 100;
  const porductImg = `${serverUrl}/${images[0]}`;

  return (
    <div className="w-[250px] bg-primary-foreground p-4 group shadow-sm hover:shadow-md">
      <div className="max-w-[250px] h-auto group-hover:scale-105 transition duration-300">
        <Image src={porductImg} alt={name} width={250} height={100} />
      </div>
      <div className="">
        <h1 className="text-md font-semibold leading-6 mt-2">{name}</h1>
        <div className="flex items-center justify-center gap-1">
          <Ratings numOfRating={Math.ceil(ratings)} />{" "}
          <span>({numOfReviews})</span>
        </div>
        <h2
          className={cn(stock > 0 ? "text-green-500" : "text-rose-500", "my-1")}
        >
          {stock > 0 ? "Product In Stock" : "Out Of Stock"}
        </h2>
        <h3 className="font-bold mb-2">
          TK. {discountPrice} ({discountParsentage}% Off)
        </h3>

        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
