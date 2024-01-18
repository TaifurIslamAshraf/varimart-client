import { styles } from "@/app/[lang]/styles";
import { mixProduct } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const MixProdcts = async () => {
  const data = await mixProduct();

  return (
    <div className={cn(styles.paddingY)}>
      <h1 className={cn(styles.headingText)}>Just For You</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center items-center justify-center place-content-center flex-wrap mt-5 gap-2 md:gap-4">
        {data?.products?.map((item: any) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
      <div className="mx-auto w-[200px] mt-10">
        <Button variant={"outline"}>
          <Link className="font-semibold" href={"/product"}>
            See More Products
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MixProdcts;
