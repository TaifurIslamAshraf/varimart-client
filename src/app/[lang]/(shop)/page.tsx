import { Button } from "@/components/ui/button";
import { Locale, getDictionary } from "../dictionaries";

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
      <p>{intl.name}</p>
    </main>
  );
}
