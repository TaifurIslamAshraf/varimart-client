"use client";

import StarRatings from "react-star-ratings";

const Ratings = ({ numOfRating }: { numOfRating: number }) => {
  return (
    <StarRatings
      rating={numOfRating}
      starRatedColor="orange"
      starHoverColor="orange"
      starDimension="15px"
      starSpacing="0px"
    />
  );
};

export default Ratings;
