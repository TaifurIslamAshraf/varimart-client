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
import { ElectronicsDescriptionSchema } from "@/lib/formSchema/productSchema";
import { creactProduct } from "@/redux/features/product/productSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

const ElectronicsDescForm: FC<Props> = ({ formStep, setFormStep }) => {
  const form = useForm<z.infer<typeof ElectronicsDescriptionSchema>>({
    resolver: zodResolver(ElectronicsDescriptionSchema),
    defaultValues: {
      colors: "",
      brand: "",
      warrantyPeriod: "",
      batteryCapacity: "",
      bodyMaterials: "",
      chargingTime: "",
      countryOrigin: "",
      dimensions: "",
      features: "",
      model: "",
      powerSupply: "",
      waterproof: "",
    },
  });

  const dispatch = useDispatch();

  const handleSubmit = (
    value: z.infer<typeof ElectronicsDescriptionSchema>
  ) => {
    dispatch(
      creactProduct({
        ...value,
      })
    );
    setFormStep(formStep >= 1 ? 2 : 2);
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
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <Input placeholder="Read, blue, black..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product Brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Product Model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chargingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charging Time</FormLabel>
                <FormControl>
                  <Input placeholder="Product Charging Time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batteryCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bettery Capacity</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Bettery Capacity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyMaterials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body Materials</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Body Materials" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOrigin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Origin</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Country Origin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dimensions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimensions</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product Dimensions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product Features" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="powerSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Power Supply</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Power Supply" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="warrantyPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warranty Period</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Warranty Period" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waterproof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waterproof</FormLabel>
                <FormControl>
                  <Input placeholder="Yes, no, true, false" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ElectronicsDescForm;
