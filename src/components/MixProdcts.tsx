import { styles } from "@/app/styles";
import { mixProduct } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

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
    </div>
  );
};

export default MixProdcts;
