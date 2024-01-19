"use client";

import StarRatings from "react-star-ratings";

interface Props {
  numOfRating: number;
  size: string;
  space: string;
}

const Ratings = ({ numOfRating, size, space }: Props) => {
  return (
    <StarRatings
      rating={numOfRating}
      starRatedColor="orange"
      starHoverColor="orange"
      starDimension={size}
      starSpacing={space}
    />
  );
};

export default Ratings;
