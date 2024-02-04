"use client";

import { useState } from "react";

import ElectronicsDescForm from "@/app/(dashboard)/components/productForm/ElectronicsDescForm";
import FoodsDescForm from "@/app/(dashboard)/components/productForm/FoodsDescForm";
import ProductFormPreview from "@/app/(dashboard)/components/productForm/ProductFormPreview";
import ProductFormStep from "@/app/(dashboard)/components/productForm/ProductFormStep";
import ProductInfoForm from "@/app/(dashboard)/components/productForm/ProductInfoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const [formStep, setFormStep] = useState(0);
  const { productCreateData } = useSelector((state: any) => state.product);

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="">
        <h1 className="font-semibold text-2xl mb-4">Create Product</h1>

        <Card>
          <CardHeader>
            <CardTitle>
              <ProductFormStep formStep={formStep} setFormStep={setFormStep} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formStep === 0 && (
              <ProductInfoForm formStep={formStep} setFormStep={setFormStep} />
            )}
            {formStep === 1 &&
              productCreateData?.descriptionType === "electronics" && (
                <ElectronicsDescForm
                  formStep={formStep}
                  setFormStep={setFormStep}
                />
              )}
            {formStep === 1 &&
              productCreateData?.descriptionType === "foods" && (
                <FoodsDescForm formStep={formStep} setFormStep={setFormStep} />
              )}

            {formStep === 2 && <ProductFormPreview />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProduct;
