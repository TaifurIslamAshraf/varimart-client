"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

type Props = {
  searchParams?: any;
};

const PriceFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      console.log(params);
      return params.toString();
    },
    [searchParams]
  );
  const handleQuery = () => {
    if (minPrice) {
      router.push(`/products?${createQueryString("minPrice", minPrice)}`);
    }
    if (maxPrice) {
      router.push(`/products?${createQueryString("maxPrice", maxPrice)}`);
    }
  };

  return (
    <div className="space-y-1">
      <h1 className="font-[400] text-lg">Price</h1>
      <Separator />
      <div className="flex items-center">
        <Input
          name="minPrice"
          placeholder="Min"
          type="number"
          onChange={(e) => setMinPrice(e.target.value)}
          className="mr-2"
        />
        -
        <Input
          name="maxPrice"
          placeholder="Max"
          type="number"
          onChange={(e) => setMaxPrice(e.target.value)}
          className="ml-2"
        />
        <Button onClick={handleQuery} className="ml-3" size={"sm"}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PriceFilters;
