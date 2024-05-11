"use client";

import { Button } from "@/components/ui/button";
import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { deleteCustomerReview } from "@/lib/fetch/customerReview";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const ReviewDeleteBtn: FC<Props> = ({ id }) => {
  const session = useSession();

  const handleCustomerReviewDelete = async (reviewId: string) => {
    const data = await deleteCustomerReview(
      reviewId,
      session?.data?.accessToken!
    );
    const data = await deleteCustomerReview(reviewId);

    if (data?.success) {
      toast.success("Customer review delete success");
      customRevalidateTag("customerReview");
    } else if (!data?.success) {
      toast.error("Somthing is wrong");
    }
  };

  return (
    <Button
      size={"icon"}
      className="bg-red-400"
      onClick={() => handleCustomerReviewDelete(id)}
    >
      <Trash2 />
    </Button>
  );
};

export default ReviewDeleteBtn;
