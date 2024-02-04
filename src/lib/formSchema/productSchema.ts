import { z } from "zod";

export const ElectronicsDescriptionSchema = z.object({
  colors: z
    .string({ required_error: "Color is required" })
    .min(1, "Color is required"),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, "Brand is required"),
  warrantyPeriod: z.string().optional(),
  countryOrigin: z.string().optional(),
  batteryCapacity: z.string().optional(),
  features: z.string().optional(),
  dimensions: z.string().optional(),
  model: z.string().optional(),
  waterproof: z.string().optional(),
  powerSupply: z.string().optional(),
  bodyMaterials: z.string().optional(),
  chargingTime: z.string().optional(),
});

export const FoodsDescriptionSchema = z.object({
  ingredients: z
    .string({
      required_error: "Product Ingredients is required",
    })
    .min(1, "Product Ingredients is required"),
  foodDesc: z.string().optional(),
});

export const ProductSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(1, "Product name is required"),
  descriptionType: z
    .enum(["electronics", "foods", ""], {
      required_error: "Product descriptionType is required",
    })
    .refine((value) => value !== "", {
      message: "Product descriptionType is required",
    }),
  price: z
    .string({ required_error: "Product price is required" })
    .min(1, "Product name is required"),
  discountPrice: z.string().optional(),
  stock: z
    .string({ required_error: "Product stock is required" })
    .min(1, "Product name is required"),

  shipping: z
    .string({ required_error: "Product shipping is required" })
    .min(1, "Product name is required"),
  subcategory: z
    .string({ required_error: "subcategory required" })
    .min(1, "Product name is required"),
  category: z
    .string({ required_error: "product category is required" })
    .min(1, "Product name is required"),
});
