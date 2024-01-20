"use client";

import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Product {
  name: string;
  slug: string;
  price: number;
  discountPrice?: string;
  images: [string];
}

const AddToCart = ({ product }: { product: any }) => {
  let [cartProduct, setCartProduct] = useState<any[]>([]);

  const handleClick = () => {
    setCartProduct([...cartProduct, product]);
  };

  useEffect(() => {
    const cookiesProducts = getCookie("product_cart");
    if (
      typeof cookiesProducts !== "string" &&
      cookiesProducts &&
      typeof cookiesProducts !== "boolean"
    ) {
      const myCookies = JSON.parse(cookiesProducts);
      if (myCookies) {
        setCartProduct([...myCookies, cartProduct]);
      }
    }
  }, [cartProduct]);

  useEffect(() => {
    setCookie("product_cart", JSON.stringify(cartProduct));
  }, [cartProduct]);

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
