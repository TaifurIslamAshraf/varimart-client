"use client";

import { byNowItem } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const BuyNow = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (product?.stock > 0) {
      dispatch(
        byNowItem({
          productName: product?.name,
          price: product?.discountPrice,
          quantity: 1,
          image: product?.images[0],
          product: product?._id,
          shippingPrice: product?.shipping,
        })
      );

      router.push("/buynow");
    } else {
      toast.error("Product Out of stock");
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleClick}
      disabled={product?.stock <= 0}
    >
      Buy Now
    </Button>
  );
};

export default BuyNow;
