import { serverApi } from "../utils";

export const mixProduct = async () => {
  const res = await fetch(`${serverApi}/product/all-products`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
};
