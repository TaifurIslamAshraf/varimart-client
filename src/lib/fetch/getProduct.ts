import { serverApi } from "../utils";

interface QueryProps {
  page?: string;
  limit?: string;
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  ratings?: string;
}

export const mixProduct = async () => {
  const res = await fetch(`${serverApi}/product/all-products`, {
    next: { tags: ["getAllProducts"] },
  });
  const data = await res.json();

  return data;
};

export const resentSold = async () => {
  const res = await fetch(`${serverApi}/product/sold-product`, {
    next: { tags: ["getAllProducts"] },
  });
  const data = await res.json();

  return data;
};

export const getAllProducts = async ({
  page = "1",
  limit = "10",
  category = "",
  subcategory = "",
  search = "",
  minPrice = "",
  maxPrice = "",
  ratings = "0",
}: QueryProps) => {
  try {
    const res = await fetch(
      `${serverApi}/product/all-products?page=${page}&ratings=${ratings}&limit=${limit}&category=${category}&subcategory=${subcategory}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      { next: { tags: ["getAllProducts"] } }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const singleProduct = async (slug: string) => {
  try {
    const res = await fetch(`${serverApi}/product/single-product/${slug}`, {
      next: { tags: ["getAllProducts"] },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
