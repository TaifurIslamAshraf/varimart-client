"use client";

import { useSelector } from "react-redux";
import ElectronicsDescPreview from "./ElectronicsDescPreview";
import FoodsDescPreview from "./FoodsDescPreview";

const ProductFormPreview = () => {
  const { productCreateData } = useSelector((state: any) => state.product);
  console.log(productCreateData);

  return (
    <div>
      {productCreateData?.descriptionType === "foods" && <FoodsDescPreview />}
      {productCreateData?.descriptionType === "electronics" && (
        <ElectronicsDescPreview />
      )}
    </div>
  );
};

export default ProductFormPreview;
