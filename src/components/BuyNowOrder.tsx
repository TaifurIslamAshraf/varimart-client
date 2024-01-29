import { LoadingButton } from "./LoaderButton";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

type Props = {
  selectItem: any;
  totalPrice: any;
  minShippingPrice: number;
  totalAmount: number;
  isLoading: boolean;
};

const BuyNowOrder = ({
  selectItem,
  totalPrice,
  minShippingPrice,
  totalAmount,
  isLoading,
}: Props) => {
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
                  {item?.productName}{" "}
                  <span className="font-bold text-sm">x {item?.quantity}</span>
                </td>
                <td className="border border-gray-400 p-2">{item.price}</td>
              </tr>
            </>
          ))}
          <tr className="font-semibold">
            <td className="border border-gray-400 p-2">subTotal</td>
            <td className="border border-gray-400 p-2">{totalPrice}</td>
          </tr>
          <tr className="font-semibold">
            <td className="border border-gray-400 p-2">Shipping Charge</td>
            <td className="border border-gray-400 p-2">
              {minShippingPrice === 0 ? "Free" : minShippingPrice}
            </td>
          </tr>
          <tr className="font-semibold">
            <td className="border border-gray-400 p-2">Total</td>
            <td className="border border-gray-400 p-2">{totalAmount}</td>
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
          {isLoading ? <LoadingButton /> : <Button>Confirm Order</Button>}
        </div>
      </div>
    </div>
  );
};

export default BuyNowOrder;
