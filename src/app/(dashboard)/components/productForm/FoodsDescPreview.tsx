"use client";

import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

const FoodsDescPreview = () => {
  const { productCreateData } = useSelector((state: any) => state.product);

  const {
    name,
    price,
    shipping,
    stock,
    ingredients,
    discountPrice,
    foodDesc,
    images,
  } = productCreateData;

  images?.forEach((item: File) => {
    console.log(URL.createObjectURL(item));
  });

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="font-semibold text-xl">Product Info</h1>
        <div className="space-y-1 font-medium">
          <h2>Name: {name}</h2>
          <h2>Price: {price}</h2>
          <h2>Discount Price: {discountPrice}</h2>
          <h2>shipping Charge: {shipping}</h2>
          <h2>Stock: {stock}</h2>
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        <h1 className="font-semibold text-xl">Description</h1>
        <div className="space-y-1 font-medium">
          <h2>Ingredients: {ingredients}</h2>
          <h2>Describ: {foodDesc}</h2>
        </div>
      </div>
      <Separator />
      <div className="">
        <h1>Images</h1>
        <div className=""></div>
      </div>
    </div>
  );
};

export default FoodsDescPreview;
