"use client";

import { styles } from "@/app/styles";
import ComponentLoader from "@/components/ComponentLoader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, serverUrl } from "@/lib/utils";
import { useGetCartItemsQuery } from "@/redux/features/cart/cartApi";
import { deleteCartItem } from "@/redux/features/cart/cartSlice";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const { isSuccess, isLoading, data, refetch, error } = useGetCartItemsQuery(
    {}
  );
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState({
    price: 0,
    discountPrice: 0,
  });
  const [productQuantity, setProductQuantity] = useState<any[]>([]);

  //select all product
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
    setSelectedProduct([]);

    if (e.target.checked) {
      setSelectedProduct(data?.products?.map((items: any) => items._id) || []);
    }
  };

  //select product for order
  const handleToggleProduct = (productId: string) => {
    const isSelected = selectedProduct.includes(productId);
    if (isSelected) {
      setSelectedProduct((prev) =>
        prev.filter((id: string) => id !== productId)
      );
    } else {
      setSelectedProduct((prev) => [...prev, productId]);
    }
  };

  //update product quantity and update price
  const handleProductQuantity = (productId: string, quantity: number) => {
    const isProductSelected = selectedProduct.find(
      (item) => item === productId
    );

    if (isProductSelected) {
      const updatedProductQuantity = productQuantity.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      setProductQuantity(updatedProductQuantity);

      // set updated price again

      let mainPrice = 0;
      let discountPrice = 0;
      updatedProductQuantity.forEach((item) => {
        const product = productDetails.find((p) => p._id === item.productId);
        mainPrice += product ? parseInt(product.price) * item.quantity : 0;
        discountPrice += product
          ? parseInt(product.discountPrice) * item.quantity
          : 0;
      });

      setTotalPrice({
        price: mainPrice,
        discountPrice: discountPrice,
      });
    } else {
      toast.error("Select this product");
    }
  };

  //handle delete product from cart
  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteCartItem({ productId }));
    setSelectedProduct((prev) => prev.filter((id: string) => id !== productId));
    refetch();
  };

  //handle proceed
  const handleProceed = () => {
    if (selectedProduct.length < 1) {
      toast.error("Select Atleast One Product");
    }
  };

  //side effects

  // Set the initial state for productQuantity in the useEffect
  useEffect(() => {
    const initialProductQuantity =
      (data?.products || []).map((product: any) => ({
        productId: product._id,
        quantity: 1,
      })) || [];
    setProductQuantity(initialProductQuantity);
  }, [data?.products]);

  // total price
  useEffect(() => {
    let mainPrice = 0;
    let discountPrice = 0;
    productDetails?.forEach((item: any) => {
      mainPrice += parseInt(item.price);
      discountPrice += parseInt(item.discountPrice);
    });
    setTotalPrice({
      price: mainPrice,
      discountPrice: discountPrice,
    });
  }, [productDetails]);

  //get selected prodct details
  useEffect(() => {
    const selectedProductDetails = data?.products?.filter((items: any) =>
      selectedProduct.includes(items._id)
    );

    setProductDetails(selectedProductDetails);
  }, [data?.products, selectedProduct]);

  //for handle hidretion errro
  useEffect(() => {
    setIsMount(true);
    refetch();
  }, [refetch]);

  if (!isMount) {
    return <ComponentLoader />;
  }

  return (
    <div className={cn(styles.paddingX, "mt-[180px]")}>
      <div className="flex justify-between max-w-[1200px] w-full mx-auto gap-6 p-4">
        <div className="w-full">
          <div className="flex items-center justify-between bg-primary-foreground p-4 shadow-sm">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={selectedProduct?.length === data?.products?.length}
                name="all-item"
                onChange={handleSelectAll}
                disabled={data?.products?.length < 0}
              />
              <Label htmlFor="all-item">
                Select All ({selectedProduct ? selectedProduct?.length : 0})
              </Label>
            </div>
            <h1>
              {user?.fullName ? user.fullName : ""} - Your Total:{" "}
              <span className="text-green-400 font-[500] line-through">
                Tk {totalPrice.price}
              </span>{" "}
              <span className="text-green-400 font-[500]">
                {totalPrice.discountPrice} Tk
              </span>
            </h1>
          </div>
          <div className="mt-6 bg-primary-foreground shadow-sm">
            {isSuccess &&
              data?.products &&
              data.products.map((product: any, index: number) => (
                <>
                  <div
                    className={cn(
                      selectedProduct.includes(product._id)
                        ? "bg-gray-300"
                        : "",
                      "py-4 flex justify-between items-center gap-10 p-4"
                    )}
                    key={product._id}
                  >
                    <div className="basis-[60%] flex justify-start items-center gap-4">
                      <input
                        name="items"
                        type="checkbox"
                        checked={selectedProduct.includes(product._id)}
                        onChange={() => handleToggleProduct(product._id)}
                      />
                      <div className="flex flex-grow justify-start gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            className="max-w-full max-h-full object-contain"
                            src={`${serverUrl}/${product.images}`}
                            alt={product.slug}
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="space-y-4">
                          <h1>
                            <Link href={`/products/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h1>
                          <Button
                            onClick={() => handleDeleteProduct(product._id)}
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
                          className="px-2 text-center font-semibold border-gray-300 border bg-gray-200"
                          onClick={() =>
                            handleProductQuantity(
                              product._id,
                              productQuantity.find(
                                (qty) => qty.productId === product._id
                              )?.quantity - 1 || 1
                            )
                          }
                          disabled={
                            productQuantity.find(
                              (qty) => qty.productId === product._id
                            )?.quantity === 1
                          }
                        >
                          -
                        </button>
                        <input
                          className="w-[35px] px-1 text-center border-gray-300 border outline-none"
                          disabled
                          type="number"
                          name="quantity"
                          value={
                            productQuantity.find(
                              (qty) => qty.productId === product._id
                            )?.quantity || 1
                          }
                          onChange={(e) =>
                            handleProductQuantity(
                              product._id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <button
                          className="px-2 text-center border-gray-300 border bg-gray-200"
                          onClick={() =>
                            handleProductQuantity(
                              product._id,
                              productQuantity.find(
                                (qty) => qty.productId === product._id
                              )?.quantity + 1 || 1
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
                        <p className="line-through">{product?.price} TK.</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </>
              ))}
          </div>

          <div className="p-4 bg-primary-foreground flex items-end flex-col">
            <Button className="gap-2 text-lg" onClick={handleProceed}>
              Proceed <ArrowRight size={20} />{" "}
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
  );
};

export default CartPage;
