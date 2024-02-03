"use client";

import { useState } from "react";

import ProductFormStep from "@/app/(dashboard)/components/productForm/ProductFormStep";
import ProductInfoForm from "@/app/(dashboard)/components/productForm/ProductInfoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateProduct = () => {
  const [formStep, setFormStep] = useState(0);

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProduct;
