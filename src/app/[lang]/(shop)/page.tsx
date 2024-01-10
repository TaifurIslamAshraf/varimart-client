import { Button } from "@/components/ui/button";
import Protected from "@/lib/Protected";
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
    <Protected>
      <main className="h-[200vh] relative">
        <Button className="">Hello world</Button>
        <p>{intl?.searchPlacholder}</p>
        <h1 className={cn(styles.headingText)}>All Products</h1>
      </main>
    </Protected>
  );
}
