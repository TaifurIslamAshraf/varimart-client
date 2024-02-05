"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSchema } from "@/lib/formSchema/productSchema";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

import { creactProduct } from "@/redux/features/product/productSlice";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
  setLocalImages: Dispatch<SetStateAction<any[]>>;
}

const ProductInfoForm: FC<Props> = ({
  formStep,
  setFormStep,
  setLocalImages,
}) => {
  const [subcategory, setSubcategory] = useState<any[] | null>(null);
  const [images, setImages] = useState<FileList | null>(null);

  //redux state
  const { isLoading, data } = useGetAllCategoryQuery({});
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      descriptionType: "",
      price: "",
      discountPrice: "",
      stock: "",
      shipping: "",
    },
  });

  const handleSubmit = async (value: z.infer<typeof ProductSchema>) => {
    const formData = new FormData();
    if (images) {
      const imageArray: File[] = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        formData.append(`images`, file);
        imageArray.push(file);
      }

      dispatch(creactProduct(value));
      setLocalImages(imageArray);
      setFormStep(formStep + 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    setImages(files);
  };

  return (
    <div className="max-w-[700px] w-full mx-auto">
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-5"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Product Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="discountPrice"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Product Discount Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="stock"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Product Stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="shipping"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Charge</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Shipping Charge"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedCategory = data?.category?.find(
                      (item: any) => item?._id === value
                    );
                    setSubcategory(selectedCategory?.subcategory || null);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.category?.map((item: any) => (
                      <SelectItem key={item?._id} value={item?._id}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="subcategory"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subcategory &&
                      subcategory?.map((item: any) => (
                        <SelectItem key={item?._id} value={item?._id}>
                          {item?.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="descriptionType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Product Description" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="foods">Foods</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            <FormLabel>Shipping Charge</FormLabel>
            <Input
              required
              type="file"
              multiple
              onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              placeholder="Enter Shipping Charge"
            />
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductInfoForm;
