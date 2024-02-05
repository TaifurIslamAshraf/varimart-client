"use client";

import { FC } from "react";
import { useSelector } from "react-redux";
import ElectronicsDescPreview from "./ElectronicsDescPreview";
import FoodsDescPreview from "./FoodsDescPreview";

type Props = {
  localImages: any[];
};

const ProductFormPreview: FC<Props> = ({ localImages }) => {
  const { productCreateData } = useSelector((state: any) => state.product);

  return (
    <div>
      {productCreateData?.descriptionType === "foods" && (
        <FoodsDescPreview localImages={localImages} />
      )}
      {productCreateData?.descriptionType === "electronics" && (
        <ElectronicsDescPreview localImages={localImages} />
      )}
    </div>
  );
};

export default ProductFormPreview;
