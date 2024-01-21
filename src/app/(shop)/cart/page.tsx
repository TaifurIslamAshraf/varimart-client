"use client";

import { styles } from "@/app/styles";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, serverUrl } from "@/lib/utils";
import { useGetCartItemsQuery } from "@/redux/features/cart/cartApi";
import { deleteCartItem } from "@/redux/features/cart/cartSlice";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
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

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
    setSelectedProduct([]);

    if (e.target.checked) {
      setSelectedProduct(data?.products?.map((items: any) => items._id) || []);
    }
  };

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

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteCartItem({ productId }));
    setSelectedProduct((prev) => prev.filter((id: string) => id !== productId));
    refetch();
  };

  //side effects

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

  useEffect(() => {
    const selectedProductDetails = data?.products?.filter((items: any) =>
      selectedProduct.includes(items._id)
    );

    setProductDetails(selectedProductDetails);
  }, [data?.products, selectedProduct]);

  useEffect(() => {
    setIsMount(true);
    refetch();
  }, [refetch]);

  if (!isMount) {
    return null;
  }

  return (
    <div className={cn(styles.paddingX, "mt-[180px]")}>
      <div className="flex justify-between max-w-[1100px] w-full mx-auto gap-6 p-4">
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
          <div className="mt-6 bg-primary-foreground shadow-sm p-4">
            {isSuccess &&
              data?.products &&
              data.products.map((product: any, index: number) => (
                <>
                  <div
                    className="py-4 flex justify-between items-center gap-10"
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
                      <div className="">Item</div>
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
        </div>
        <div className="basis-1/3 h-[300px] bg-blue-200">Part three</div>
      </div>
    </div>
  );
};

export default CartPage;
