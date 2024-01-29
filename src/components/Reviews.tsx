"use client";

import { serverUrl } from "@/lib/utils";
import { useCreateReviewMutation } from "@/redux/features/reviews/reviewApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
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

type Props = {
  reviews: [
    {
      user: string;
      fullName: string;
      rating: number;
      comment: string;
      approved: boolean;
      createdOn: Date;
      _id: string;
    }
  ];
  name: string;
  image: string;
  productId: string;
  productRatings: number;
  numOfReviews: number;
};

const Reviews: FC<Props> = ({
  reviews,
  productRatings,
  name,
  image,
  productId,
  numOfReviews,
}) => {
  const [isMount, setIsMount] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);
  const [createReview, { isLoading, error, isSuccess }] =
    useCreateReviewMutation();

  const isReviewdUser = reviews.find((item) => item.user === user._id);

  function countStarRatings(): StarCounts {
    let oneStar = 0;
    let twoStar = 0;
    let threeStar = 0;
    let fourStar = 0;
    let fiveStar = 0;

    reviews?.forEach((item) => {
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
  console.log(reviewCounts);
  //change ratings value
  const handleChangeRating = (rating: number) => {
    if (!isReviewdUser) {
      setRating(rating);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReview({
      rating,
      comment,
      productId,
    });
    router.refresh();
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
    setIsMount(true);
    setRating(isReviewdUser?.rating!);
    setComment(isReviewdUser?.comment!);
  }, [isReviewdUser?.comment, isReviewdUser?.rating]);

  if (!isMount) {
    return <SectionLoader />;
  }

  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Reviews and Ratings
      </h1>
      <Separator />
      <div className="flex justify-between items-center mt-3">
        <div className="space-y-2 flex-1">
          <div className="space-y-3">
            <h2 className="font-[500] text-lg">Your rating & review</h2>
            <div className="">
              <StarRatings
                rating={rating}
                starRatedColor="orange"
                starHoverColor="orange"
                starDimension="27px"
                starSpacing="2px"
                changeRating={handleChangeRating}
              />
              {isReviewdUser ? (
                <h2>
                  {isReviewdUser?.comment.length > 40 ? (
                    <>{isReviewdUser?.comment.slice(0, 40)}...</>
                  ) : (
                    isReviewdUser?.comment
                  )}
                </h2>
              ) : (
                ""
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-5">
                  {isReviewdUser ? "Update Your Review" : "Write Your Review"}
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
                      <Button
                        disabled={isReviewdUser ? true : false}
                        type="submit"
                      >
                        Submit
                      </Button>
                    )}
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-center mr-4 space-y-1">
            <h1 className="font-semibold text-2xl">{productRatings}</h1>
            <Ratings
              numOfRating={Math.ceil(productRatings)}
              size="20px"
              space="0"
            />
            <p>{numOfReviews} Reviews</p>
          </div>
          <div className="">
            {Object.keys(reviewCounts).map((value, index) => (
              <div className="flex items-center gap-4 my-3" key={index}>
                <Ratings numOfRating={parseInt(value)} size="20px" space="0" />
                <Progress
                  value={reviewCounts[parseInt(value)]}
                  className="w-[70%]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
