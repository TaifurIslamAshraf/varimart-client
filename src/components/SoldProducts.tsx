import { styles } from "@/app/[lang]/styles";
import { resentSold } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

const SoldProducts = async () => {
  const data = await resentSold();

  return (
    <div className={cn(styles.paddingY)}>
      <h1 className={cn(styles.headingText)}>Resently Sold Products</h1>
      <div className="flex text-center items-center flex-wrap mt-5 gap-6">
        {data?.product?.map((item: any) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SoldProducts;
