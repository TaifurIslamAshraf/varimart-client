"use client";

import ComponentLoader from "@/components/ComponentLoader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useGetOrderStatusQuery,
  useGetSingleOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/orders/orderApi";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  params: { id: string };
};

const SingleOrder: FC<Props> = ({ params }) => {
  const { isLoading, data, refetch } = useGetSingleOrdersQuery(params.id);
  const { refetch: orderStatusRefetch } = useGetOrderStatusQuery({});
  const session = useSession();

  const [
    updateOrderStatus,
    { isSuccess, error, isLoading: updateOrderLoading },
  ] = useUpdateOrderStatusMutation();

  const handleChange = async (value: string) => {
    await updateOrderStatus({
      id: params.id,
      data: { orderStatus: value },
      accessToken: session?.data?.accessToken,
    });

    await refetch();
    await orderStatusRefetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order Status Updated");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <>
      {isLoading || updateOrderLoading ? (
        <ComponentLoader />
      ) : (
        <div className="ml-[230px] mt-[70px] p-4">
          <h1 className="font-semibold text-3xl my-4">Order Details</h1>
          <div className="">
            <Card className="py-4">
              <CardContent className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h2>
                      <span className="font-medium">Order ID:</span>{" "}
                      {data?.order?.orderId}
                    </h2>
                    <h3>
                      <span className="font-medium ">Order Status:</span>{" "}
                      {data?.order?.orderStatus}
                    </h3>
                  </div>
                  <div className="">
                    <Select onValueChange={(value) => handleChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Order Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />

                <div className="space-y-4">
                  <h2 className="font-semibold text-2xl">Order</h2>
                  <div className="text-lg space-y-1">
                    <h4>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(data?.order?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </h4>
                    <h4>
                      <span className="font-medium">Payment Type:</span>{" "}
                      {data?.order?.paymentType}
                    </h4>
                    <h4>
                      <span className="font-medium">Order Note:</span>{" "}
                      {data?.order?.orderNotes}
                    </h4>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h2 className="font-semibold text-2xl">Shipping Info</h2>
                  <div className="text-lg space-y-1">
                    <h4>
                      <span className="font-medium">Name:</span>{" "}
                      {data?.order?.shippingInfo?.fullName}
                    </h4>
                    <h4>
                      <span className="font-medium">Phone:</span>{" "}
                      {data?.order?.shippingInfo?.phone}
                    </h4>
                    <h4>
                      <span className="font-medium">Address:</span>{" "}
                      {data?.order?.shippingInfo?.address}
                    </h4>
                  </div>
                </div>
                <Separator />

                <div className="space-y-4">
                  <h2 className="font-semibold text-2xl">Order Items</h2>

                  <table className="w-full table-auto border-collapse border border-gray-400">
                    <thead>
                      <tr>
                        <th className="border border-gray-400 p-2 text-start">
                          Product Info
                        </th>
                        <th className="border border-gray-400 p-2 text-start">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {data?.order?.orderItems?.map((item: any) => (
                        <>
                          <tr key={item?.product}>
                            <td className="border border-gray-400 p-2">
                              {item?.productName}{" "}
                              <span className="font-bold text-sm">
                                x {item?.quantity}
                              </span>
                            </td>
                            <td className="border border-gray-400 p-2">
                              {parseInt(item?.price) * item?.quantity}
                            </td>
                          </tr>
                        </>
                      ))}
                      <tr className="font-semibold">
                        <td className="border border-gray-400 p-2">subTotal</td>
                        <td className="border border-gray-400 p-2">
                          {data?.order?.itemsPrice}
                        </td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="border border-gray-400 p-2">
                          Shipping Charge
                        </td>
                        <td className="border border-gray-400 p-2">
                          {data?.order?.shippingPrice <= 0
                            ? "Free"
                            : data?.order?.shippingPrice}
                        </td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="border border-gray-400 p-2">Total</td>
                        <td className="border border-gray-400 p-2">
                          {data?.order?.totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrder;
