"use client";

import { FC } from "react";

import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import OrdersTable from "../../components/OrdersTable";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const AllOrders: FC<Props> = ({ searchParams }) => {
  const { isLoading, data } = useGetAllOrdersQuery({
    orderStatus: searchParams?.orderStatus,
    page: searchParams?.page,
  });

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <h1 className="font-semibold text-2xl">All Orders</h1>
      <OrdersTable data={data?.orders} />
    </div>
  );
};

export default AllOrders;
