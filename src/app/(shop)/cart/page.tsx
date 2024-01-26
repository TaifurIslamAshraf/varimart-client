"use client";

import { styles } from "@/app/styles";
import ComponentLoader from "@/components/ComponentLoader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, serverUrl } from "@/lib/utils";
import {
  useGetCartItemQuery,
  useSyncCartMutation,
  useTotalPriceQuery,
} from "@/redux/features/cart/cartApi";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CartPage = () => {
  const [syncCart, {}] = useSyncCartMutation();
  const { isLoading, isSuccess, refetch } = useGetCartItemQuery({});
  const { refetch: totalPriceRefetch } = useTotalPriceQuery({});
  const { user } = useSelector((state: any) => state.auth);
  const { allCartProducts, totalPrice } = useSelector(
    (state: any) => state.cart
  );

  const router = useRouter();

  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [selectAll, setSelectAll] = useState<boolean>();
  const [toggleProduct, setToggleProduct] = useState<any[]>([]);

  //select all product
  const handleSelectAll = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingFetch(true);
    setSelectAll(e.target.checked);
    setToggleProduct((prev) =>
      prev?.map((item) => ({ ...item, selected: e.target.checked }))
    );

    await syncCart({ isSelectAll: e.target.checked });
    setIsLoadingFetch(false);

    await refetch();
    await totalPriceRefetch();
  };

  //handle toggol product
  const handleSingleSelect = async (
    productId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setToggleProduct((prev) =>
      prev?.map((item) =>
        item?.productId === productId
          ? { ...item, selected: e.target.checked }
          : item
      )
    );

    const isAllSelected = toggleProduct.every((item) => item.selected);
    setSelectAll(isAllSelected);

    await syncCart({ isSelect: e.target.checked, productId });
    await refetch();
    await totalPriceRefetch();
  };

  //update product quantity and update price
  const handleQuantityDecrement = async (
    productId: string,
    quantity: number
  ) => {
    setIsLoadingFetch(true);
    await syncCart({ productId, cartQuantity: quantity - 1 });
    setIsLoadingFetch(false);
    await refetch();
    await totalPriceRefetch();
  };
  const handleQuantityIncrement = async (
    productId: string,
    quantity: number
  ) => {
    setIsLoadingFetch(true);
    await syncCart({ productId, cartQuantity: quantity + 1 });
    setIsLoadingFetch(false);
    await refetch();
    await totalPriceRefetch();
  };

  //handle delete product from cart
  const handleDeleteProduct = async (productId: string) => {
    setIsLoadingFetch(true);
    await syncCart({ productId, deleteCartItem: "true" });
    setIsLoadingFetch(false);
    await refetch();
    await totalPriceRefetch();
  };

  //handle proceed
  const handleProceed = () => {
    const isOneSelect = toggleProduct.find((item) => item.selected === true);
    if (!isOneSelect) {
      toast.error("Select Atleast One Product");
    } else {
      router.push("/checkout");
    }
  };

  //side effects

  useEffect(() => {
    const initialToggleProduct =
      allCartProducts?.cartItem?.map((item: any) => ({
        selected: item.selected,
        productId: item.productId,
      })) || [];
    setToggleProduct(initialToggleProduct);
  }, [allCartProducts]);

  useEffect(() => {
    setSelectAll(allCartProducts?.selectAll);
  }, [allCartProducts?.selectAll]);

  //for handle hidretion errro
  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return <ComponentLoader />;
  }

  return (
    <>
      {isLoading || isLoadingFetch ? (
        <ComponentLoader />
      ) : (
        <div className={cn(styles.paddingX, "mt-[180px]")}>
          <div className="flex justify-between max-w-[1200px] w-full mx-auto gap-6 p-4">
            <div className="w-full">
              <div className="flex items-center justify-between bg-primary-foreground p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    name="all-item"
                    onChange={handleSelectAll}
                  />
                  <Label htmlFor="all-item">Select All</Label>
                </div>
                <h1>
                  {user?.fullName ? user.fullName : ""} - Your Total:{" "}
                  <span className="text-red-500 line-through">
                    TK. {totalPrice?.totalMainPrice}
                  </span>{" "}
                  <span className="text-green-500 font-[500]">
                    TK. {totalPrice?.totalDiscountPrice}
                  </span>
                </h1>
              </div>
              <div className="mt-6 bg-primary-foreground shadow-sm">
                {isSuccess &&
                  allCartProducts?.cartItem &&
                  allCartProducts?.cartItem?.map(
                    (product: any, index: number) => (
                      <>
                        <div
                          className={cn(
                            product.selected ? "bg-gray-100" : "",
                            "py-4 flex justify-between items-center gap-10 p-4"
                          )}
                          key={product.productId}
                        >
                          <div className="basis-[60%] flex justify-start items-center gap-4">
                            <input
                              name="items"
                              type="checkbox"
                              checked={
                                toggleProduct?.find(
                                  (item) =>
                                    item?.productId === product?.productId
                                )?.selected || false
                              }
                              onChange={(e) =>
                                handleSingleSelect(product?.productId, e)
                              }
                            />
                            <div className="flex flex-grow justify-start gap-4">
                              <div className="flex-shrink-0">
                                <Image
                                  className="max-w-full max-h-full object-contain"
                                  src={`${serverUrl}/${product?.product?.image}`}
                                  alt={product?.product?.slug}
                                  width={120}
                                  height={120}
                                />
                              </div>
                              <div className="space-y-4">
                                <h1>
                                  <Link
                                    href={`/products/${product?.product?.slug}`}
                                  >
                                    {product?.product?.name}
                                  </Link>
                                </h1>
                                <Button
                                  onClick={() =>
                                    handleDeleteProduct(product?.productId)
                                  }
                                  className="hover:bg-red-300"
                                  variant={"link"}
                                  size={"icon"}
                                >
                                  <Trash2 size={15} />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="basis-[40%] flex justify-between">
                            <div className="flex items-center justify-center">
                              <button
                                className={cn(
                                  product?.quantity <= 1
                                    ? "cursor-not-allowed"
                                    : "",
                                  "px-2 text-center font-semibold border-gray-300 border bg-gray-200"
                                )}
                                onClick={() =>
                                  handleQuantityDecrement(
                                    product?.productId,
                                    product.quantity
                                  )
                                }
                                disabled={product?.quantity <= 1}
                              >
                                -
                              </button>
                              <input
                                className="w-[35px] px-1 text-center border-gray-300 border outline-none"
                                disabled
                                value={product?.quantity}
                                type="number"
                                name="quantity"
                              />
                              <button
                                className="px-2 text-center border-gray-300 border bg-gray-200"
                                onClick={() =>
                                  handleQuantityIncrement(
                                    product?.productId,
                                    product.quantity
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="">
                              <h1 className="font-semibold">
                                {product?.discountPrice} TK.
                              </h1>
                              <p className="line-through">
                                {product?.price} TK.
                              </p>
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )
                  )}
              </div>

              <div className="p-4 bg-primary-foreground flex items-end flex-col">
                <Button
                  className="gap-2"
                  onClick={handleProceed}
                  disabled={toggleProduct?.length === 0}
                >
                  Place Order <ArrowRight size={15} />{" "}
                </Button>
              </div>
            </div>
            <div className="basis-1/3 h-[230px] bg-primary-foreground p-4">
              <div className="flex items-center gap-3 space-y-5">
                <Image
                  className="mt-2"
                  src={"/cash-on-delivery.png"}
                  alt="cash on deliviery"
                  height={25}
                  width={25}
                />
                <h1>Cash on Delivery Available</h1>
              </div>
              <div className="flex items-center gap-3 space-y-5">
                <Image
                  className="mt-2"
                  src={"/replacement-policy.png"}
                  alt="cash on deliviery"
                  height={25}
                  width={25}
                />
                <h1>7 Days Replacement Policy</h1>
              </div>
              <div className="flex items-center gap-3 space-y-5">
                <Image
                  className="mt-2"
                  src={"/authentic.png"}
                  alt="cash on deliviery"
                  height={25}
                  width={25}
                />
                <h1>100% Authentice</h1>
              </div>
              <div className="flex items-center gap-3 space-y-5">
                <Image
                  className="mt-2"
                  src={"/image-processing.png"}
                  alt="cash on deliviery"
                  height={25}
                  width={25}
                />
                <h1>As shown in picture</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
