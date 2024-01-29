import { revalidatePath } from "next/cache";
import { serverApi } from "../utils";

export const createReview = async (data: any) => {
  "use server";

  const res = await fetch(`${serverApi}/product/create-review`, {
    method: "PUT",
    body: data,
    credentials: "include",
  });

  revalidatePath("/products/[slug]/page");

  const review = await res.json();

  return review;
};
