"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FoodsDescriptionSchema } from "@/lib/formSchema/productSchema";
import { creactProductData } from "@/redux/features/product/productSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

interface Props {
  formStep: number;
  setFormStep: (formStep: number) => void;
}

const FoodsDescForm: FC<Props> = ({ formStep, setFormStep }) => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FoodsDescriptionSchema>>({
    resolver: zodResolver(FoodsDescriptionSchema),
    defaultValues: {
      foodDesc: "",
      ingredients: "",
    },
  });

  const handleSubmit = (value: z.infer<typeof FoodsDescriptionSchema>) => {
    dispatch(
      creactProductData({
        ...value,
      })
    );
    form.reset();
    setFormStep(formStep >= 1 ? 2 : 2);
  };

  return (
    <div>
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sugar, Wheat flour, Cocoa butter..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Make sure input should like this: Nonfat milk, Chocolate, Palm
                  kernel oil, Lactose (milk)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foodDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe about you product"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Button>Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FoodsDescForm;
