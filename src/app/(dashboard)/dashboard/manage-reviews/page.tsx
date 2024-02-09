"use client";

import Ratings from "@/components/Ratings";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { serverUrl } from "@/lib/utils";

import {
  useDeleteReviewMutation,
  useGetAllProductReviewsQuery,
  useUpdateReviewStatusMutation,
} from "@/redux/features/reviews/reviewApi";
import { IManageReview } from "@/types/review";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ManageReviews = () => {
  const { data } = useGetAllProductReviewsQuery({});
  const [updateReviewStatus, { isSuccess, error }] =
    useUpdateReviewStatusMutation();
  const [
    deleteReview,
    { isLoading, isSuccess: deleteIsSuccess, error: deleteError },
  ] = useDeleteReviewMutation();

  const productReviews = data?.productsReviews as IManageReview[];

  const handleChange = async (
    value: string,
    reviewId: string,
    productId: string
  ) => {
    const data = {
      productId,
      reviewId,
      approved: Boolean(value),
    };
    await updateReviewStatus(data);
    customRevalidateTag("getSingleProduct");
    customRevalidateTag("getAllProducts");
  };

  const handleDelete = async (reviewId: string, productId: string) => {
    console.log(reviewId, productId);
    await deleteReview({ reviewId, productId });
    customRevalidateTag("getSingleProduct");
    customRevalidateTag("getAllProducts");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review status successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.success("Review delete successfull");
    } else if (error) {
      const errorData = deleteError as any;
      toast.error(errorData?.data?.message);
    }
  }, [deleteError, deleteIsSuccess, error]);

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">Product Reviews</h1>
        <div className="">
          {productReviews?.map((item) => (
            <div className="bg-gray-100 my-4 p-2 space-y-4" key={item?._id}>
              <h1 className="text-lg">
                <span className="font-medium">Product:</span>{" "}
                {item?.productName}
              </h1>

              <div className="space-y-4">
                <h2 className="font-medium text-xl">Reviews</h2>
                {item?.reviews?.map((review) => (
                  <div className="space-y-4" key={item?._id}>
                    <Separator />
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          className="rounded-full"
                          src={
                            review?.avatar
                              ? `${serverUrl}/${review?.avatar}`
                              : "/default-avater.jpg"
                          }
                          alt={review.fullName}
                          width={50}
                          height={50}
                        />
                        <div className="">
                          <h3>{review.fullName}</h3>
                          <p>
                            {new Date(review?.createdOn).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="">
                          <Select
                            onValueChange={(value) =>
                              handleChange(value, review?._id, item?.productId)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Update Review Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Approved</SelectItem>
                              <SelectItem value="false">
                                Not Approved
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="">
                          <Button
                            onClick={() =>
                              handleDelete(review?._id, item?.productId)
                            }
                            size={"icon"}
                            variant={"outline"}
                          >
                            <Trash2 className="text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <Ratings
                        numOfRating={review?.rating}
                        size="15px"
                        space="1px"
                      />
                      <h1>
                        <span className="font-medium">Comment:</span>{" "}
                        {review?.comment}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
