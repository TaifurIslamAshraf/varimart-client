import { serverApi } from "../utils";

export const getBanners = async (bannerType = "", category = "") => {
  try {
    const res = await fetch(
      `${serverApi}/banner/get-all-banners?bannerType=${bannerType}&category=${category}`,
      {
        next: { tags: ["Banner"] },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const banners = await res.json();
    return banners;
  } catch (error: any) {
    console.log(error.message);
  }
};
