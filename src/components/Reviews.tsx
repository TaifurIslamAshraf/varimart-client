"use client";

import { serverUrl } from "@/lib/utils";
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from "@/redux/features/reviews/reviewApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";

import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { LoadingButton } from "./LoaderButton";
import Ratings from "./Ratings";
import SectionLoader from "./SectionLoader";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface StarCounts {
  [key: number]: number;
}

interface Ireviews {
  user: string;
  fullName: string;
  avatar: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdOn: Date;
  _id: string;
}

type Props = {
  name: string;
  image: string;
  productId: string;
  productRatings: number;
  numOfReviews: number;
};

const Reviews: FC<Props> = ({
  productRatings,
  name,
  image,
  productId,
  numOfReviews,
}) => {
  const [isMount, setIsMount] = useState(false);
  const [rating, setRating] = useState<number>();
  const [comment, setComment] = useState("");

  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);
  const { productReview } = useSelector((state: any) => state.porductReviews);

  const [createReview, { isLoading, error, isSuccess }] =
    useCreateReviewMutation();
  const { refetch } = useGetReviewsQuery({ userId: user?._id, productId });

  function countStarRatings(): StarCounts {
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;

    productReview?.productReviews?.forEach((item: any) => {
      if (item.rating === 1) {
        oneStar++;
      } else if (item.rating === 2) {
        twoStar++;
      } else if (item.rating === 3) {
        threeStar++;
      } else if (item.rating === 4) {
        fourStar++;
      } else if (item.rating === 5) {
        fiveStar++;
      }
    });

    return { 1: oneStar, 2: twoStar, 3: threeStar, 4: fourStar, 5: fiveStar };
  }

  const reviewCounts: StarCounts = countStarRatings();

  //change ratings value
  const handleChangeRating = (rating: number) => {
    setRating(rating);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Select Rating");
    } else {
      await createReview({
        rating,
        comment,
        productId,
      });

      customRevalidateTag("getSingleProduct");
      customRevalidateTag("getAllProducts");
      await refetch();
      router.refresh();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your Order is Submittd");
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [error, isSuccess]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setIsMount(true);
  }, [refetch]);

  if (!isMount) {
    return <SectionLoader />;
  }

  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Reviews and Ratings
      </h1>
      <Separator />
      <div className="flex lg:justify-between justify-center lg:flex-row flex-col-reverse  items-center mt-3 gap-6">
        <div className="space-y-2 my-4 lg:my-0 text-center lg:text-start lg:flex-1 flex-auto">
          <div className="space-y-3">
            <h2 className="font-[500] text-lg">Write rating & review</h2>
            <div className="">
              <StarRatings
                rating={rating}
                starRatedColor="orange"
                starHoverColor="orange"
                starDimension="27px"
                starSpacing="2px"
                changeRating={handleChangeRating}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-5 sm:w-auto w-full">
                  Write Your Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-start">
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${serverUrl}/${image}`}
                        alt={name}
                        width={50}
                        height={50}
                      />
                      <div className="">
                        <h1 className="text-base">{name}</h1>
                        <p className="text-sm font-normal">Rate this product</p>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <StarRatings
                      rating={rating}
                      starRatedColor="orange"
                      starHoverColor="orange"
                      starDimension="35px"
                      starSpacing="4px"
                      changeRating={handleChangeRating}
                    />
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <Textarea
                      required
                      minLength={10}
                      value={comment}
                      className="h-[100px]"
                      name="comment"
                      placeholder="Describe your experience (optional)"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    {isLoading ? (
                      <LoadingButton />
                    ) : (
                      <Button type="submit">Submit</Button>
                    )}
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="text-center lg:mr-4 mr-0 space-y-1">
            <h1 className="font-semibold text-2xl">
              {parseFloat(productRatings.toString()).toFixed(2)}
            </h1>
            <Ratings
              numOfRating={Math.ceil(productRatings)}
              size="20px"
              space="0"
            />
            <p>{numOfReviews} Reviews</p>
          </div>
          <div className="">
            {Object.keys(reviewCounts)
              ?.reverse()
              .map((value, index) => {
                const progressValue =
                  (reviewCounts[parseInt(value)] / productReview?.userLength) *
                  100;
                return (
                  <div
                    className="flex items-center justify-center gap-4 my-3"
                    key={index}
                  >
                    <Ratings
                      numOfRating={parseInt(value)}
                      size="20px"
                      space="0"
                    />
                    {/* <Line
                      className="sm:w-[70%] w-[50%]"
                      strokeColor={"orange"}
                      strokeWidth={4}
                      trailWidth={4}
                      percent={progressValue}
                    /> */}
                    <Progress
                      value={progressValue}
                      className="sm:w-[70%] w-[50%] bg-gray-300"
                    />
                    <p>{reviewCounts[parseInt(value)]}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <Separator />

      <div className="py-6">
        {productReview?.productReviews?.map((item: any) => (
          <>
            <div className="space-y-3 my-6" key={item._id}>
              <div className="flex items-center gap-3">
                <div className="">
                  {item?.avatar ? (
                    <Image
                      className="rounded-full"
                      src={`${serverUrl}/${item?.avatar}`}
                      alt="avatar"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      src={"/avater.png"}
                      alt="avatar"
                      width={50}
                      height={50}
                    />
                  )}
                </div>
                <div className="">
                  <h1 className="font-medium">
                    {item.fullName},{" "}
                    <span className="sm:text-sm text-xs font-normal opacity-80">
                      {" "}
                      {new Date(item?.createdOn).toDateString()}
                    </span>
                  </h1>
                  <Ratings numOfRating={item?.rating} size="16px" space="0px" />
                </div>
              </div>
              <p>{item.comment}</p>
            </div>

            <Separator />
          </>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
