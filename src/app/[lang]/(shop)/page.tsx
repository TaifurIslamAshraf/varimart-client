import { Button } from "@/components/ui/button";
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
    <main>
      <Button className="">Hello world</Button>
      <p>{intl?.name}</p>
      <h1 className={cn(styles.headingText)}>All Products</h1>
    </main>
  );
}
