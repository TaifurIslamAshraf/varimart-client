"use client";

import { styles } from "@/app/styles";
import { Separator } from "@/components/ui/separator";
import { cn, serverUrl } from "@/lib/utils";
import { useGetOrderQuery } from "@/redux/features/orders/orderApi";
import Image from "next/image";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  //access state
  const { user } = useSelector((state: any) => state.auth);
  const { allOrders } = useSelector((state: any) => state.order);

  const { isLoading } = useGetOrderQuery({ userId: user?._id });

  const myOrders = allOrders?.userOrders;

  return (
    <section className={cn(styles.paddingX, styles.paddingY)}>
      <div>
        <h1 className="font-semibold text-2xl animate-in fade-in duration-700">
          My Orders{" "}
          <span className="font-normal text-sm">
            (Total Order: {myOrders?.length})
          </span>
        </h1>
        <Separator className="my-4" />
      </div>
      <div className="">
        {myOrders?.map((item: any) => (
          <div className=" bg-gray-100 gap-4 px-2" key={item._id}>
            <div className="space-y-1">
              <h2 className="font-medium text-lg">
                Your Order ID: {item?.orderId} ({item?.orderItems?.length}{" "}
                items)
              </h2>
              <h2 className="font-medium">
                Order Status:{" "}
                <span
                  className={cn(
                    item?.orderStatus === "Cancelled"
                      ? "text-red-500"
                      : "text-green-500 animate-in fade-in duration-700"
                  )}
                >
                  {item?.orderStatus}
                </span>
              </h2>
            </div>

            <div className="my-5">
              {item?.orderItems?.map((order: any) => (
                <>
                  <div
                    className="flex items-center justify-between py-4 gap-6"
                    key={order?._id}
                  >
                    <div className="flex items-center gap-4 flex-1 ">
                      <Image
                        src={`${serverUrl}/${order?.image}`}
                        alt={order?.productName}
                        width={50}
                        height={50}
                      />
                      <h1>{order?.productName}</h1>
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <h2>{order?.quantity}X</h2>
                      <h2>TK.{order?.price}</h2>
                    </div>
                  </div>
                </>
              ))}
              <Separator />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistory;
