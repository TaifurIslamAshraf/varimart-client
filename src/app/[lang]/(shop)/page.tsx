import Category from "@/components/Category";
import MixProdcts from "@/components/MixProdcts";
import SoldProducts from "@/components/SoldProducts";
import BannerSlider from "@/components/bannerSlider";
import { cn } from "@/lib/utils";
import { Locale, getDictionary } from "../dictionaries";
import { styles } from "../styles";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Home({ params: { lang } }: Props) {
  const intl = await getDictionary(lang);

  return (
    <main className={cn("h-[200vh] mt-[140px]", styles.paddingX)}>
      <div className="flex items-center justify-between h-[320px] gap-4">
        <div className="max-w-[350px] w-full">
          <Category />
        </div>
        <div className="h-full w-full">
          <BannerSlider />
        </div>
      </div>

      <div className="">
        <MixProdcts />
      </div>
      <div className="">
        <SoldProducts />
      </div>
    </main>
  );
}
