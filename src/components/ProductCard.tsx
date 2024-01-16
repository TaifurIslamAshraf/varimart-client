import { serverUrl } from "@/lib/utils";
import Image from "next/image";

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  const { name, images, ratings, stock, price, discountPrice, numOfReviews } =
    product;

  const porductImg = `${serverUrl}/${images[0]}`;

  return (
    <div className="w-[250px] bg-primary-foreground p-4">
      <div className="max-w-[250px] h-auto">
        <Image src={porductImg} alt={name} width={250} height={100} />
      </div>
      <div className="">
        <h1 className="text-lg leading-6">{name}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
