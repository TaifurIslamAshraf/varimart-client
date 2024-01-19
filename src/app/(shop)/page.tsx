import Cart from "@/components/Cart";
import Category from "@/components/Category";
import CustomerReview from "@/components/CustomerReview";
import Footer from "@/components/Footer";
import MixProdcts from "@/components/MixProdcts";
import SoldProducts from "@/components/SoldProducts";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import BannerSlider from "@/components/bannerSlider";
import { cn } from "@/lib/utils";

import { styles } from "../styles";

export default async function Home() {
  return (
    <main className={cn("h-[200vh] mt-[70px] lg:mt-[140px]")}>
      <div className="fixed top-[90%] z-40 right-5 lg:hidden">
        <Cart />
      </div>
      <div
        className={cn(
          styles.paddingX,
          "flex items-center justify-between h-auto lg:h-[320px] gap-4"
        )}
      >
        <div className="w-full max-w-[270px] hidden lg:block">
          <Category />
        </div>
        <div className="h-full w-full">
          <BannerSlider />
        </div>
      </div>

      <div className={cn(styles.paddingX)}>
        <MixProdcts />
      </div>
      <div className={cn(styles.paddingX)}>
        <SoldProducts />
      </div>
      <div className={(styles.paddingY, styles.paddingX, "mb-20")}>
        <h1 className={cn(styles.headingText, "text-center")}>
          Customer Review
        </h1>
        <CustomerReview />
      </div>
      <YoutubePlaylist />
      <div className={"pt-20"}>
        <Footer />
      </div>
    </main>
  );
}
