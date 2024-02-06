"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";

type Props = {
  form: any;
};

const UpdateElectronicsDesc: FC<Props> = ({ form }) => {
  return (
    <div className="space-y-5">
      <FormField
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
        control={form?.control}
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
    </div>
  );
};

export default UpdateElectronicsDesc;
