import { z } from "zod";

export const bannerSchema = z
  .object({
    bannerType: z.enum(["topBanner", "mainBanner", "categoryBanner"]),
    category: z.string().optional(),
    subcategory: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.bannerType === "categoryBanner") {
        return data.category !== undefined && data.subcategory !== undefined;
      }
      return true;
    },
    {
      message: "Category and Subcategory is required",
    }
  );
