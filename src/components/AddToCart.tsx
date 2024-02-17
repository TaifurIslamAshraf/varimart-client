"use client";

import {
  useAddToCartMutation,
  useGetCartItemQuery,
  useTotalPriceQuery,
} from "@/redux/features/cart/cartApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LoadingButton } from "./LoaderButton";
import { Button } from "./ui/button";

interface Product {
  name: string;
  slug: string;
  price: number;
  discountPrice?: string;
  images: [string];
}

const AddToCart = ({ product, btnFull }: { product: any; btnFull: string }) => {
  const dispatch = useDispatch();
  const { refetch } = useGetCartItemQuery({});
  const { refetch: totalPriceRefetch } = useTotalPriceQuery({});

  const [addToCart, { isLoading, isSuccess, error, isError }] =
    useAddToCartMutation();
  const handleClick = async () => {
    console.log(product?.stock);
    if (product?.stock > 0) {
      await addToCart({ productId: product._id });
      await refetch();
      await totalPriceRefetch();
    } else {
      toast.error("Product Out of stock");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Add To Cart");
    } else if (isError) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [error, isError, isSuccess]);

  return (
    <>
      {isLoading ? (
        <LoadingButton className={btnFull} />
      ) : (
        <Button
          disabled={product?.stock <= 0}
          className="hover:bg-[#000000a2] transition-all"
          onClick={handleClick}
        >
          Add To Cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
