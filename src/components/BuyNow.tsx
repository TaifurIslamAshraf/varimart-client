"use client";

import { byNowItem } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const BuyNow = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
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
  };

  return (
    <Button variant={"outline"} onClick={handleClick}>
      Buy Now
    </Button>
  );
};

export default BuyNow;
