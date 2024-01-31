import { styles } from "@/app/styles";
import Cart from "@/components/Cart";
import ClearFilter from "@/components/ClearFilter";
import MobileFilter from "@/components/MobileFilter";
import PriceFilters from "@/components/PriceFilters";
import ProductCard from "@/components/ProductCard";
import RatingsFilters from "@/components/RatingsFilters";
import SubCategoryFilters from "@/components/SubCategoryFilters";
import BannerSlider from "@/components/bannerSlider";
import Paginations from "@/components/pagination";
import { getAllProducts } from "@/lib/fetch/getProduct";
import { cn } from "@/lib/utils";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Products = async ({ searchParams }: Props) => {
  const data = await getAllProducts(searchParams);
  // lg:mt-[140px] mt-[65px]
  return (
    <div className={cn(styles.paddingX)}>
      <div className="fixed top-[90%] z-40 right-5 lg:hidden">
        <Cart />
      </div>
      <BannerSlider
        category={searchParams?.subcategory as string}
        bannerType="categoryBanner"
      />
      <div className={cn("lg:flex block")}>
        <div
          className={cn(
            styles.paddingY,
            "basis-[22%] md:px-4 px-0 shadow-lg bg-secondary hidden lg:block"
          )}
        >
          <h1 className="font-semibold uppercase text-xl mb-4">Filters</h1>
          <div className="space-y-5">
            <SubCategoryFilters subcategory={data?.allSubcategory} />
            <PriceFilters />
            <RatingsFilters />
            <ClearFilter />
          </div>
        </div>

        <div className={cn(styles.paddingY, "md:px-4 px-0")}>
          <div className="flex justify-between items-center">
            <h1 className={cn(styles.headingText)}>All Products</h1>

            {/* mobile filters */}
            <div className="lg:hidden block">
              <MobileFilter subcategory={data?.allSubcategory} />
            </div>
          </div>
          {data?.products ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center items-center justify-center place-content-center flex-wrap mt-5 gap-3 md:gap-4">
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

      {/* paginations  */}
      <Paginations
        pagination={data?.pagination}
        category={searchParams?.subcategory as string}
      />
    </div>
  );
};

export default Products;
