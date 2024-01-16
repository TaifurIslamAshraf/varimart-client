"use client";

import StarRatings from "react-star-ratings";

const Ratings = ({ numOfRating }: { numOfRating: number }) => {
  return (
    <StarRatings
      rating={numOfRating}
      starRatedColor="orange"
      starHoverColor="orange"
      starDimension="20px"
      starSpacing="2px"
    />
  );
};

export default Ratings;
