"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const PriceFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice"));
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice"));
  const params = new URLSearchParams(searchParams);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, minPrice]
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
          value={minPrice?.toString()}
          className="mr-2"
        />
        -
        <Input
          name="maxPrice"
          placeholder="Max"
          type="number"
          onChange={(e) => setMaxPrice(e.target.value)}
          value={maxPrice?.toString()}
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
