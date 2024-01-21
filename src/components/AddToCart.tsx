"use client";

import { storeCartItem } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

interface Product {
  name: string;
  slug: string;
  price: number;
  discountPrice?: string;
  images: [string];
}

const AddToCart = ({ product }: { product: any }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(storeCartItem({ product: product._id }));
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
