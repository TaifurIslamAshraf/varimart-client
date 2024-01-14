import Category from "@/components/Category";
import { Locale, getDictionary } from "../dictionaries";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Home({ params: { lang } }: Props) {
  const intl = await getDictionary(lang);

  return (
    <main className="h-[200vh] mt-[140px]">
      <Category />
    </main>
  );
}
