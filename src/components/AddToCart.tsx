"use client";

import { Button } from "./ui/button";

const AddToCart = ({ product }: { product: any }) => {
  const handleClick = () => {
    console.log(product);
  };

  return (
    <Button
      className="hover:bg-[#000000a2] transition-all"
      onClick={handleClick}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
