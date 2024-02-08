"use client";

import { useGetAllProductReviewsQuery } from "@/redux/features/product/productApi";

const ManageReviews = () => {
  const { isLoading, data } = useGetAllProductReviewsQuery({});

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="">
        <h1>Product Reviews</h1>
      </div>
    </div>
  );
};

export default ManageReviews;
