"use client";

import { useEffect, useState } from "react";

import ElectronicsDescForm from "@/app/(dashboard)/components/productForm/ElectronicsDescForm";
import FoodsDescForm from "@/app/(dashboard)/components/productForm/FoodsDescForm";
import ProductFormPreview from "@/app/(dashboard)/components/productForm/ProductFormPreview";
import ProductFormStep from "@/app/(dashboard)/components/productForm/ProductFormStep";
import ProductInfoForm from "@/app/(dashboard)/components/productForm/ProductInfoForm";
import { LoadingButton } from "@/components/LoaderButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const [formStep, setFormStep] = useState(0);
  const [localImages, setLocalImages] = useState<any[]>([]);

  const { productCreateData } = useSelector((state: any) => state.product);
  const [createProduct, { data, isSuccess, error, isLoading }] =
    useCreateProductMutation();

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      // Append other form data
      formData.append("name", productCreateData.name);
      formData.append("category", productCreateData.category);
      formData.append("subcategory", productCreateData.subcategory);
      formData.append("descriptionType", productCreateData.descriptionType);
      formData.append("price", productCreateData.price);
      formData.append("discountPrice", productCreateData.discountPrice);
      formData.append("stock", productCreateData.stock);
      formData.append("shipping", productCreateData.shipping);
      if (productCreateData.descriptionType === "foods") {
        formData.append("ingredients", productCreateData.ingredients);
        formData.append("shipping", productCreateData.foodDesc);
      } else if (productCreateData.descriptionType === "electronics") {
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
        } = productCreateData;
        formData.append("colors", colors);
        formData.append("brand", brand);
        formData.append("warrantyPeriod", warrantyPeriod);
        formData.append("batteryCapacity", batteryCapacity);
        formData.append("bodyMaterials", bodyMaterials);
        formData.append("chargingTime", chargingTime);
        formData.append("countryOrigin", countryOrigin);
        formData.append("dimensions", dimensions);
        formData.append("features", features);
        formData.append("model", model);
        formData.append("powerSupply", powerSupply);
        formData.append("waterproof", waterproof);
      }

      // Append images
      localImages.forEach((image) => {
        formData.append("images", image);
      });

      await createProduct(formData);
      revalidatePath("/products");

      setLocalImages([]);
    } catch (error) {
      // Handle errors
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Created successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

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
              <ProductInfoForm
                setLocalImages={setLocalImages}
                formStep={formStep}
                setFormStep={setFormStep}
              />
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

            {formStep === 2 && <ProductFormPreview localImages={localImages} />}

            <div className="my-10">
              {formStep === 2 &&
                (isLoading ? (
                  <LoadingButton />
                ) : (
                  <Button className="" onClick={handleCreate}>
                    Create Product
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProduct;
