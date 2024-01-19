import { styles } from "@/app/styles";
import PriceFilters from "@/components/PriceFilters";
import ProductCard from "@/components/ProductCard";
import RatingsFilters from "@/components/RatingsFilters";
import SubCategoryFilters from "@/components/SubCategoryFilters";
import BannerSlider from "@/components/bannerSlider";
import { getAllProducts } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Products = async ({ searchParams }: Props) => {
  const data = await getAllProducts(searchParams);
  console.log(data);
  return (
    <div className={cn(styles.paddingX, "mt-[140px]")}>
      <BannerSlider />
      <div className={cn("flex")}>
        <div
          className={cn(
            styles.paddingY,
            "basis-[22%] px-4 shadow-lg bg-secondary"
          )}
        >
          <h1 className="font-semibold uppercase text-xl mb-4">Filters</h1>
          <div className="space-y-4">
            <SubCategoryFilters subcategory={data?.allSubcategory} />
            <PriceFilters />
            <RatingsFilters />
          </div>
        </div>

        <div className={cn(styles.paddingY, "px-4")}>
          <h1 className={cn(styles.headingText)}>All Products</h1>
          {data.products ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center items-center justify-center place-content-center flex-wrap mt-5 gap-2 md:gap-4">
              {data?.products?.map((item: any) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-10 text-2xl text-red-500">
              <h1>{data?.message}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
