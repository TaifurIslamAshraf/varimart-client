"use client";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { FilePenLine, Trash } from "lucide-react";
import { FC } from "react";

type Props = {
  product: IProduct;
};

const ProductAction: FC<Props> = ({ product }) => {
  const handleDeleteProduct = () => {
    console.log(product);
  };

  return (
    <div className="flex items-center gap-5">
      <div className="">
        <Button size={"icon"}>
          <FilePenLine />
        </Button>
      </div>
      <div className="">
        <Button
          onClick={handleDeleteProduct}
          size={"icon"}
          className="bg-red-400"
        >
          <Trash className="" />
        </Button>
      </div>
    </div>
  );
};

export default ProductAction;
