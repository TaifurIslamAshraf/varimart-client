"use client";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

type Props = {
  cartItems: any;
  totalPrice: any;
};

const Orders = ({ cartItems, totalPrice }: Props) => {
  const selectItem = cartItems?.cartItem?.filter(
    (item: any) => item?.selected === true
  );

  //find lowest shipping charge
  const minShippingPrice = selectItem?.reduce((min: any, item: any) => {
    const shipping = parseInt(item?.product?.shipping);
    return shipping < min ? shipping : min;
  }, Infinity);

  console.log(minShippingPrice);

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2 text-start">
              Product Info
            </th>
            <th className="border border-gray-400 p-2 text-start">Amount</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {selectItem?.map((item: any) => (
            <>
              <tr key={item.productId}>
                <td className="border border-gray-400 p-2">
                  {item?.product?.name}{" "}
                  <span className="font-bold text-sm">x {item?.quantity}</span>
                </td>
                <td className="border border-gray-400 p-2">
                  {parseInt(item?.discountPrice) * item?.quantity}
                </td>
              </tr>
            </>
          ))}
          <tr className="font-semibold">
            <td className="border border-gray-400 p-2">subTotal</td>
            <td className="border border-gray-400 p-2">
              {totalPrice.totalDiscountPrice}
            </td>
          </tr>
          <tr className="font-semibold">
            <td className="border border-gray-400 p-2">Shipping Charge</td>
            <td className="border border-gray-400 p-2">
              {minShippingPrice === 0 ? "Free" : minShippingPrice}
            </td>
          </tr>
          <tr className="font-semibold">
            <td className="border border-gray-400 p-2">Total</td>
            <td className="border border-gray-400 p-2">
              {totalPrice.totalDiscountPrice + parseInt(minShippingPrice)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-gray-200 mt-6 p-4">
        <div className="flex items-center gap-1">
          <input defaultChecked type="radio" name="delivery" id="" />
          <Label className="text-lg">Cash on delivery</Label>
        </div>
        <Separator />

        <div className="mt-4">
          <p className="text-sm">
            Your parsonal data will be used to process your order, support, your
            experience throughout this website
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <Button>Confirm Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
