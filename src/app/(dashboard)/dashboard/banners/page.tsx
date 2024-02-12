import { Separator } from "@/components/ui/separator";
import { getBanners } from "@/lib/fetch/banner.data";
import { serverUrl } from "@/lib/utils";
import Image from "next/image";
import BannerDeleteBtn from "../../components/BannerDeleteBtn";
import CreateBanners from "../../components/CreateBanners";

type IBanners = {
  _id: string;
  bannerType: string;
  category?: string;
  image: string;
};

const page = async () => {
  const banners = await getBanners();
  console.log(banners);

  return (
    <div className="ml-[230px] mt-[70px] p-4 space-y-6">
      <div className="">
        <h1 className="font-semibold text-2xl">Create Banners</h1>
        <CreateBanners />
      </div>
      <div className="space-y-6">
        <h1 className="font-semibold text-2xl">All Banners</h1>

        <Separator />
        <div className="space-y-4">
          <h2 className="font-medium text-xl">Main Banners</h2>
          <div className="flex flex-wrap gap-6">
            {banners?.banner?.map((item: IBanners) => (
              <div
                className="group transition-all duration-500 relative"
                key={item?._id}
              >
                {item?.bannerType === "mainBanner" && (
                  <div className="">
                    <Image
                      src={`${serverUrl}/${item?.image}`}
                      alt="Customer reviews"
                      width={500}
                      height={400}
                    />
                    <div className="group-hover:block hidden transition-all absolute top-1 right-1">
                      <BannerDeleteBtn id={item._id} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />
        <div className="space-y-4">
          <h2 className="font-medium text-xl">Category Banners</h2>
          <div className="flex flex-wrap gap-6">
            {banners?.banner?.map((item: IBanners) => (
              <div className="" key={item?._id}>
                {item?.bannerType === "categoryBanner" && (
                  <div className="">
                    <Image
                      src={`${serverUrl}/${item?.image}`}
                      alt="Customer reviews"
                      width={500}
                      height={400}
                    />
                    <div className="flex items-center justify-between space-y-4 bg-gray-100 p-2">
                      <div className="">
                        <h3>Category: {item?.category}</h3>
                      </div>
                      <BannerDeleteBtn id={item._id} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />
        <div className="space-y-4">
          <h2 className="font-medium text-xl">Top Banners</h2>
          <div className="space-y-4">
            {banners?.banner?.map((item: IBanners) => (
              <div className="" key={item?._id}>
                {item?.bannerType === "topBanner" && (
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <Image
                        src={`${serverUrl}/${item?.image}`}
                        alt="Customer reviews"
                        width={1300}
                        height={400}
                      />
                    </div>
                    <div className="">
                      <BannerDeleteBtn id={item._id} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
