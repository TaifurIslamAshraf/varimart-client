"use client";

import { styles } from "@/app/styles";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, serverUrl } from "@/lib/utils";
import { useGetCartItemsQuery } from "@/redux/features/cart/cartApi";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { isSuccess, isLoading, data, refetch, error } = useGetCartItemsQuery(
    {}
  );
  const { user } = useSelector((state: any) => state.auth);

  const [selectAll, setSelectAll] = useState(false);
  const [isMount, setIsMount] = useState(false);

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
                checked={selectAll}
                name="all-item"
                onChange={(e) => setSelectAll(e.target.checked)}
                disabled={data?.products?.length < 0}
              />
              <Label htmlFor="all-item">
                Select All ({data?.products ? data.products.length : 0})
              </Label>
            </div>
            <h1>
              {user?.fullName ? user.fullName : ""} - Your Total:{" "}
              <span className="text-green-400 font-[500] line-through">
                Tk 12000
              </span>{" "}
              <span className="text-green-400 font-[500]">{2000} Tk</span>
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
                      <input name="items" type="checkbox" />
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
                        <div className="">
                          <h1>
                            <Link href={`/products/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h1>
                          <Button
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
                      <div className="">Tk</div>
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
