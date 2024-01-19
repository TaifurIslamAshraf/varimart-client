"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  searchParams?: any;
};

const PriceFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      console.log(params);
      return params.toString();
    },
    [searchParams]
  );

  const click = () => {
    router.push(
      `/products?${createQueryString("category", "6592de53b353ee3f3ad77bc0")}`
    );
  };

  return <div onClick={click}>hello</div>;
};

export default PriceFilters;
