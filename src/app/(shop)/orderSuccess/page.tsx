import Image from "next/image";
import Link from "next/link";

const SuccessOrder = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <Image
        src={"/order-success.png"}
        width={100}
        height={100}
        alt="Order Success"
      />

      <h1 className="text-2xl font-semibold">
        Your order successfully placed.
      </h1>

      <h1>Note: we contact very soon. thanks for order</h1>
      <div className="flex items-center justify-center gap-2 font-semibold">
        <h3>
          Go To:{" "}
          <Link className="text-blue-500 font-semibold" href={"/"}>
            Home
          </Link>
        </h3>
        <p>or</p>
        <h3>
          <Link
            className="text-blue-500 font-semibold"
            href={"/profile/order-history"}
          >
            All Orders
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default SuccessOrder;
