"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const LangSwitcher = ({ lang }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [langToggle, setLangToggle] = useState(lang === "bn" ? true : false);
  const router = useRouter();

  const switcher = () => {
    if (lang === "bn") {
      router.push("/en");
      setLangToggle(!langToggle);
    } else if (lang === "en") {
      router.push("/bn");
      setLangToggle(!langToggle);
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {langToggle ? (
        <Button variant={"outline"} className="gap-1" onClick={switcher}>
          <Image
            src={"/united-kingdom-flag.png"}
            alt="united-kingdom-flag"
            width={20}
            height={20}
          />
          English
        </Button>
      ) : (
        <Button variant={"outline"} className="gap-1" onClick={switcher}>
          <Image
            src={"/bangladesh-flag.png"}
            alt="bangladeshi flag"
            width={25}
            height={25}
          />
          বাংলা
        </Button>
      )}
    </div>
  );
};

export default LangSwitcher;
