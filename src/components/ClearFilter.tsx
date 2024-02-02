"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const ClearFilter = () => {
  const params = useSearchParams();
  const subcategory = params.get("subcategory");
  const search = params.get("search");

  const filterValue =
    subcategory !== null && subcategory !== ""
      ? `subcategory=${subcategory}`
      : `search=${search}`;

  const url = `/products?${filterValue}`;

  return (
    <div>
      <Link href={url}>
        <Button className="w-full">Clear Filter</Button>
      </Link>
    </div>
  );
};

export default ClearFilter;
