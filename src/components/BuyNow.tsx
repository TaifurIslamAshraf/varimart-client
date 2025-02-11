"use client";

import { useDataLayer } from "@/hooks/useDataLayer";
import { byNowItem } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const BuyNow = ({ product }: { product: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pushEvent } = useDataLayer();

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

      pushEvent({
        event: "buy_now",
        ecommerce: {
          currencyCode: "BDT",
          value: parseInt(product?.discountPrice) + parseInt(product?.shipping),
          items: [
            {
              item_id: product?._id,
              item_name: product?.name,
              item_brand: product?.brand,
              price: parseInt(product?.discountPrice),
              quantity: 1,
              item_category: product?.category,
              item_variant: product?.variant,
              item_list_name: "Buy Now",
              index: 0,
            },
          ],
        },
      });

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
