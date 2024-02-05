"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  localImages: any[];
};

const ElectronicsDescPreview: FC<Props> = ({ localImages }) => {
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { productCreateData } = useSelector((state: any) => state.product);
  const {
    colors,
    brand,
    warrantyPeriod,
    batteryCapacity,
    bodyMaterials,
    chargingTime,
    countryOrigin,
    dimensions,
    features,
    model,
    powerSupply,
    waterproof,
    name,
    price,
    shipping,
    stock,
    discountPrice,
  } = productCreateData;

  useEffect(() => {
    const newPreviewImg: any[] = [];

    localImages?.forEach((item: File) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        newPreviewImg.push(reader.result);

        if (newPreviewImg.length === localImages?.length) {
          setImagePreview(newPreviewImg);
        }
      };
      reader.readAsDataURL(item);
    });
  }, [localImages]);

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
          <h2>Colors: {colors}</h2>
          <h2>Brand: {brand}</h2>
          <h2>Model: {model}</h2>
          <h2>Warranty Period: {warrantyPeriod}</h2>
          <h2>Battery Capacity: {batteryCapacity}</h2>
          <h2>Body Materials: {bodyMaterials}</h2>
          <h2>Charging Time: {chargingTime}</h2>
          <h2>Country Origin: {countryOrigin}</h2>
          <h2>Dimensions: {dimensions}</h2>
          <h2>Features: {features}</h2>
          <h2>Power Supply: {powerSupply}</h2>
          <h2>Waterproof: {waterproof}</h2>
        </div>
      </div>
      <Separator />
      <div className="space-y-6">
        <h1 className="font-semibold text-xl">Images</h1>
        <div className="flex flex-wrap items-center justify-around gap-6">
          {imagePreview?.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="product image"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsDescPreview;
