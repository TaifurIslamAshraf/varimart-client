import { serverApi } from "../utils";

interface QueryProps {
  orderStatus?: string;
  page?: string;
  refresh_token: string;
}

export const getAllOrders = async ({
  orderStatus = "",
  page = "1",
  refresh_token,
}: QueryProps) => {
  const res = await fetch(
    `${serverApi}/order/all-orders?page=${page}&orderStatus=${orderStatus}`,
    {
      credentials: "include",
      cache: "no-store",
      headers: {
        refresh_token,
        "Content-Type": "application/json",
      },
    }
  );
  const order = await res.json();
  return order;
};
