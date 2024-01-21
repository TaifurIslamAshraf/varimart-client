"use client";

import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const [isMount, setIsMount] = useState(false);
  const { cartItems } = useSelector((state: any) => state.cart);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return (
      <Link href={"/cart"} className="flex items-center">
        <Button size={"icon"} variant={"outline"}>
          <ShoppingCart />
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <div className="cart">
        <Button variant={"outline"}>
          <Link href={"/cart"} className="flex items-center">
            <ShoppingCart />({cartItems.length})
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
