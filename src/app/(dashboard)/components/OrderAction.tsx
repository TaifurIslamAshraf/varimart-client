"use client";

import { Button } from "@/components/ui/button";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderStatusQuery,
} from "@/redux/features/orders/orderApi";
import { Edit, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const OrderAction: FC<Props> = ({ id }) => {
  const session = useSession();

  const [deleteOrder, { isLoading, error, isSuccess }] =
    useDeleteOrderMutation();
  const { refetch } = useGetAllOrdersQuery({});
  const { refetch: orderStatusRefetch } = useGetOrderStatusQuery({});

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder({
      id: orderId,
      accessToken: session?.data?.accessToken,
    });
    await refetch();
    await orderStatusRefetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order delete successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div className="flex items-center gap-6">
      <Link href={`/dashboard/orders/${id}`}>
        <Button size={"icon"} variant={"outline"}>
          <Edit size={20} />
        </Button>
      </Link>
      <Button
        disabled={isLoading}
        size={"icon"}
        variant={"outline"}
        onClick={() => handleDeleteOrder(id)}
      >
        <Trash2 className="text-red-500" size={20} />
      </Button>
    </div>
  );
};

export default OrderAction;
