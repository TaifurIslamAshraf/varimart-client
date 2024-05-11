"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Ratings from "./Ratings";
import { Separator } from "./ui/separator";

const RatingsFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (index: number) => {
    const star = (index + 1).toString();
    router.push(`/products?${createQueryString("ratings", star)}`);
  };

  const starCount = searchParams.get("ratings");

  return (
    <div className="">
      <h1 className="font-[400] text-lg">Ratings</h1>
      <Separator />

      {Array.from({ length: 5 })
        .map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={cn(
              starCount === (index + 1).toString() ? "bg-gray-200" : "",
              "p-1 cursor-pointer hover:bg-gray-200"
            )}
          >
            <Ratings size="20px" space="5px" numOfRating={index + 1} />
          </div>
        ))
        .toReversed()}
    </div>
  );
};

export default RatingsFilters;
