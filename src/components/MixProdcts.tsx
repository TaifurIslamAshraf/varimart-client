import { styles } from "@/app/[lang]/styles";
import { mixProduct } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

const MixProdcts = async () => {
  const data = await mixProduct();
  console.log(data);

  return (
    <div className={cn(styles.paddingY)}>
      <h1 className={cn(styles.headingText)}>Just For You</h1>
      <div className="flex text-center items-center justify-center flex-wrap mt-10 gap-6">
        {data?.products?.map((item: any) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default MixProdcts;
