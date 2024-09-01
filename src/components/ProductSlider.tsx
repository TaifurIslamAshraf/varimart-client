"use client";

import { MyImage } from "@/app/(dashboard)/components/CustomImg";
import { serverUrl } from "@/lib/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ images }: { images: [] }) => {
  return (
    <div className="mx-auto">
      <Carousel
        showArrows={true}
        autoFocus
        autoPlay
        showThumbs={true}
        stopOnHover
        verticalSwipe="standard"
        infiniteLoop
        thumbWidth={65}
        renderThumbs={(children) => children}
      >
        {images?.map((item, index) => (
          <div className="" key={index}>
            <MyImage
              className=""
              src={`${serverUrl}/${item}`}
              alt="product images"
              width={400}
              height={400}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
