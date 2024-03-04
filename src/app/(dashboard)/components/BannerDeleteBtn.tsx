"use client";

import { Button } from "@/components/ui/button";
import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { useDeleteBannerMutation } from "@/redux/features/banners/bannerApi";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const BannerDeleteBtn: FC<Props> = ({ id }) => {
  const [deleteBanner, { isLoading, isSuccess, error }] =
    useDeleteBannerMutation();
  const session = useSession();

  const handleCustomerReviewDelete = async (bannerId: string) => {
    await deleteBanner({
      id: bannerId,
      refresh_token: session?.data?.refreshToken,
    });

    customRevalidateTag("Banner");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Customer review delete success");
    } else if (error) {
      toast.error("Somthing is wrong");
    }
  }, [error, isSuccess]);

  return (
    <Button
      disabled={isLoading}
      size={"icon"}
      className="bg-red-400"
      onClick={() => handleCustomerReviewDelete(id)}
    >
      <Trash2 />
    </Button>
  );
};

export default BannerDeleteBtn;
