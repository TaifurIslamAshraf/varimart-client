"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const ClearFilter = () => {
  const params = useSearchParams();
  const url = `/products?subcategory=${params.get("subcategory")}`;

  return (
    <div>
      <Link href={url}>
        <Button className="w-full">Clear Filter</Button>
      </Link>
    </div>
  );
};

export default ClearFilter;
