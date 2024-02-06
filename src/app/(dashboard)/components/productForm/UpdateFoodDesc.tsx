"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

type Props = {
  form: any;
};

const UpdateFoodDesc: FC<Props> = ({ form }) => {
  return (
    <div>
      <FormField
        control={form?.control}
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
              <Textarea placeholder="Describe about you product" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UpdateFoodDesc;
