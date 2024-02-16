import { serverApi } from "../utils";

interface QueryProps {
  orderStatus?: string;
  page?: string;
}

export const getAllOrders = async ({
  orderStatus = "",
  page = "1",
}: QueryProps) => {
  const res = await fetch(
    `${serverApi}/order/all-orders?page=${page}&orderStatus=${orderStatus}`,
    { credentials: "include", cache: "no-store" }
  );

  const result = await res.json();
  return result;
};
