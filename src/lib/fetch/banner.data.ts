import { serverApi } from "../utils";

export const getBanners = async (bannerType = "", category = "") => {
  try {
    const res = await fetch(
      `${serverApi}/banner/get-all-banners?bannerType=${bannerType}&category=${category}`,
      { next: { tags: ["Banner"] } }
    );
    const banners = await res.json();
    return banners;
  } catch (error: any) {
    console.log(error.message);
  }
};
