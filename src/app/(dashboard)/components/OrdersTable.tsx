"use client";

import ComponentLoader from "@/components/ComponentLoader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IOrders } from "@/types/order";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import OrderAction from "./OrderAction";

interface Props {
  data: IOrders[];
  pagination: {
    currentPage: number | null;
    numOfOrders: number | null;
    prevPage: number | null;
    nextPage: number | null;
    totalPage: number | null;
  };
}

const OrdersTable: FC<Props> = ({ data, pagination }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(searchParams);
  const defaultOrderStatus = params.get("orderStatus");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [params]
  );

  const handleChange = (value: string) => {
    if (value === "All") {
      router.push(`/dashboard/orders`);
    } else {
      router.push(`/dashboard/orders?orderStatus=${value}`);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ComponentLoader />;
  }

  return (
    <div className="mt-6 space-y-4">
      {data && (
        <>
          <div className="max-w-[300px] w-full">
            <Select
              onValueChange={(value) => handleChange(value)}
              defaultValue={
                defaultOrderStatus ? (defaultOrderStatus as string) : "All"
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by order status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>

                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <div className="flex items-center gap-6">
            <Button
              size={"icon"}
              variant={"outline"}
              disabled={pagination.prevPage === null}
            >
              <Link
                href={`/dashboard/orders?${createQueryString(
                  "page",
                  String(pagination.prevPage)
                )}`}
              >
                <ChevronLeft />
              </Link>
            </Button>
            <Button
              size={"icon"}
              variant={"outline"}
              disabled={pagination.nextPage === null}
            >
              <Link
                href={`/dashboard/orders?${createQueryString(
                  "page",
                  String(pagination.nextPage)
                )}`}
              >
                <ChevronRight />
              </Link>
            </Button>
            <p className="text-sm">Total Orders: {pagination.numOfOrders}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
