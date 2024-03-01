import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { serverApi } from "../utils";

interface QueryProps {
  orderStatus?: string;
  page?: string;
}

export const getAllOrders = async ({
  orderStatus = "",
  page = "1",
}: QueryProps) => {
  const session = await getServerSession(authOptions);
  return fetch(
    `${serverApi}/order/all-orders?page=${page}&orderStatus=${orderStatus}`,
    {
      credentials: "include",
      cache: "no-store",
      headers: {
        refresh_token: session?.refreshToken!,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      // if (!res.ok) {
      //   throw new Error("Network response was not ok");
      // }
      return res.json(); // Parse response as JSON
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      throw err; // Rethrow the error to handle it outside this function
    });
};
