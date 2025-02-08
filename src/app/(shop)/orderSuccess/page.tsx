"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SuccessOrder = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  // const formattedAmount = parseInt(amount).toLocaleString("bn-BD");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 px-4">
      <Image
        src="/order-success.png"
        width={120}
        height={120}
        alt="Order Success"
        className="mb-2"
      />

      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold text-green-600">
          Varimartbd-এ অর্ডার করার জন্য আপনাকে ধন্যবাদ।
        </h1>

        <h2 className="text-xl">
          Your total amount is - <br />
          <span className="font-semibold">{amount}</span> TK
        </h2>

        <p className="text-gray-600">
          খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।
        </p>

        <p className="text-gray-600">
          ক্যাশ অর্ডার রিফান্ড করতে আপনার আইডি এক্সপ্রেস সংগ্রহ করা হবে।
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 font-medium mt-4">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          Home
        </Link>

        <span className="text-gray-400">|</span>

        <Link
          href="/profile/order-history"
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          Order history
        </Link>
      </div>
    </div>
  );
};

export default SuccessOrder;
