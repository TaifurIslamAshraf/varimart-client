import { serverApi } from "../utils";

export const getAllCustomerReviews = async () => {
  try {
    const res = await fetch(`${serverApi}/review/get-customer-review`, {
      next: { tags: ["customerReview"] },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteCustomerReview = async (id: string) => {
  try {
    const res = await fetch(
      `${serverApi}/review/delete-customer-review/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
