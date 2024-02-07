"use client";

import ComponentLoader from "@/components/ComponentLoader";
import { cn } from "@/lib/utils";
import { IOrders } from "@/types/order";
import { FC, useEffect, useState } from "react";
import OrderAction from "./OrderAction";

interface Props {
  data: IOrders[];
}

const OrdersTable: FC<Props> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ComponentLoader />;
  }

  return (
    <div className="flex items-center flex-col mt-6">
      {data && (
        <table className="border-collapse border-2 border-slate-300 p-4">
          <thead>
            <tr>
              <th className="border-2 border-slate-200 px-4 py-2">Name</th>
              <th className="border-2 border-slate-200 px-4 py-2">
                Order Status
              </th>
              <th className="border-2 border-slate-200 px-4 py-2">
                Total Amount
              </th>
              <th className="border-2 border-slate-200 px-4 py-2">
                Placed Date
              </th>
              <th className="border-2 border-slate-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="border-2 border-slate-200 px-4 py-2">
                    {item.shippingInfo.fullName}
                  </td>
                  <td
                    className={cn(
                      item.orderStatus === "Pending" && "text-blue-400",
                      item.orderStatus === "Delivered" && "text-yellow-400",
                      item.orderStatus === "Cancelled" && "text-red-400",
                      "border-2 border-slate-200 px-4 py-2"
                    )}
                  >
                    {item.orderStatus}
                  </td>
                  <td className="border-2 border-slate-200 px-4 py-2">
                    {item.totalAmount}
                  </td>
                  <td className="border-2 border-slate-200 px-4 py-2">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border-2 border-slate-200 px-4 py-2">
                    <OrderAction id={item._id} />
                  </td>
                </tr>
              ))
            ) : (
              <div className=""></div>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
