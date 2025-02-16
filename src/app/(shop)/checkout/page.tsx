"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { styles } from "@/app/styles";
import ComponentLoader from "@/components/ComponentLoader";
import Orders from "@/components/Orders";
import PageViewTracker from "@/components/PageViewTracker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  useGetCartItemQuery,
  useTotalPriceQuery,
} from "@/redux/features/cart/cartApi";
import { clearCart } from "@/redux/features/cart/cartSlice";
import {
  useCreateOrderMutation,
  useGetOrderStatusQuery,
} from "@/redux/features/orders/orderApi";
import { ListOrdered, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const orderSchema = z.object({
  fullName: z.string().min(1, "Enter Your Full Name"),
  email: z.string().optional(),
  phone: z
    .string()
    .min(1, "Enter Your Phone Number")
    .regex(/^(\+88)?(01[3-9]\d{8})$/, "Invalid Phone Number"),
  address: z.string().min(1, "Enter Shipping Address"),
  orderNots: z.string().optional(),
});

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [calculatedShipping, setCalculatedShipping] = useState<any>(0);
  const [calculatedAmount, setCalculatedAmount] = useState<any>(0);

  const { refetch } = useGetCartItemQuery({});
  const { refetch: orderStatusRefetch } = useGetOrderStatusQuery({});
  const {} = useTotalPriceQuery({});

  const [createOrder, { isLoading, error, isError, isSuccess }] =
    useCreateOrderMutation();
  const { user } = useSelector((state: any) => state.auth);
  const { allCartProducts, totalPrice } = useSelector(
    (state: any) => state.cart
  );

  const selectItem = allCartProducts?.cartItem?.filter(
    (item: any) => item?.selected === true
  );

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
  });

  const orderItems = selectItem?.map((item: any) => ({
    productName: item?.product?.name,
    price: item?.discountPrice,
    quantity: item?.quantity,
    image: item?.product?.image,
    product: item?.productId,
  }));

  const handleSubmit = async (value: z.infer<typeof orderSchema>) => {
    const data = {
      ...value,
      user: user?._id ? user?._id : "",
      paymentType: "Cash on delivery",
      orderItems,
      itemsPrice: totalPrice?.totalDiscountPrice,
      shippingPrice: calculatedShipping,
      totalAmount: calculatedAmount,
    };

    await createOrder(data);

    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        currencyCode: "BDT",
        value: calculatedAmount,
        items: orderItems.map((item: any) => ({
          item_name: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });

    await orderStatusRefetch();
    await refetch();
  };

  useEffect(() => {
    if (!selectItem?.length) return;

    const calculatedShipping = selectItem.reduce((min: number, item: any) => {
      const shipping = parseInt(item?.product?.shipping) || 0;
      return shipping < min && shipping !== 0 ? shipping : min;
    }, parseInt(selectItem[0]?.product?.shipping) || 0);

    setCalculatedShipping(calculatedShipping);
  }, [selectItem]);

  useEffect(() => {
    const subtotal = Number(totalPrice?.totalDiscountPrice) || 0;
    const shipping = Number(calculatedShipping) || 0;
    const total = subtotal + shipping;

    setCalculatedAmount(total);
  }, [calculatedShipping, totalPrice?.totalDiscountPrice]);

  useEffect(() => {
    if (isSuccess) {
      const searchParams = new URLSearchParams();

      searchParams.set("amount", calculatedAmount?.toString());
      router.replace(`/orderSuccess?${searchParams.toString()}`);
      dispatch(clearCart({}));
      toast.success("Order successfully placed");
    } else if (isError) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [
    dispatch,
    error,
    isError,
    isSuccess,
    refetch,
    router,
    totalPrice.totalDiscountPrice,
    calculatedAmount,
  ]);

  useEffect(() => {
    form.setValue("fullName", user?.fullName || "");
    form.setValue("email", user?.email || "");
    form.setValue("phone", user?.phone || "");
    form.setValue("address", user?.address || "");
    form.setValue("orderNots", "");
  }, [form, user?.address, user?.email, user?.fullName, user?.phone]);

  // lg:mt-[140px] mt-[80px]
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageViewTracker
        event="initiate_checkout"
        pageData={{
          title: "Checkout",
          type: "checkout",
        }}
        productData={orderItems}
      />
      <div
        className={cn(
          styles.paddingX,
          styles.paddingY,
          " max-w-[1200px] w-full mx-auto"
        )}
      >
        <div className="">
          <h1 className={cn("text-3xl font-semibold")}>Checkout</h1>
          <Separator />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col lg:flex-row gap-10 mt-10"
          >
            <div className="flex-1 bg-primary-foreground p-4">
              <h2 className="mb-6 text-lg font-[500] text-secondary-foreground flex items-center gap-2">
                <Receipt size={20} /> Billing Details{" "}
              </h2>
              <div className="space-y-4">
                <FormField
                  name="fullName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-primary">Full Name</Label>
                      <FormControl>
                        <Input
                          // disabled={isLoading}
                          placeholder="Enter Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-primary">Email (Optional)</Label>
                      <FormControl>
                        <Input
                          // disabled={isLoading}
                          placeholder="Enter Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-primary">Phone Number</Label>
                      <FormControl>
                        <Input
                          // disabled={isLoading}
                          placeholder="Enter Your Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-primary">Address</Label>
                      <FormControl>
                        <Input
                          // disabled={isLoading}
                          placeholder="Enter Your Full Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="orderNots"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Order Nots (Optional)</Label>
                      <Input placeholder="Enter Your Order Nots" {...field} />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex-1 bg-primary-foreground p-4">
              <h2 className="mb-6 text-lg font-[500] text-secondary-foreground flex items-center gap-2">
                <ListOrdered size={20} /> Your Order{" "}
              </h2>
              <Suspense fallback={<ComponentLoader />}>
                <Orders
                  minShippingPrice={calculatedShipping}
                  selectItem={selectItem}
                  totalPrice={totalPrice}
                  totalAmount={calculatedAmount}
                  isLoading={isLoading}
                />
              </Suspense>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
};

export default Checkout;
