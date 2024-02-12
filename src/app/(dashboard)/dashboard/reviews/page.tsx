import { getAllCustomerReviews } from "@/lib/fetch/customerReview";
import { serverUrl } from "@/lib/utils";
import Image from "next/image";
import CreateReviews from "../../components/CreateReviews";
import ReviewDeleteBtn from "../../components/ReviewDeleteBtn";

type IReviews = {
  _id: string;
  image: string;
};

const page = async () => {
  const reviews = await getAllCustomerReviews();

  return (
    <div className="ml-[230px] mt-[70px] p-4 space-y-6">
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl">Create Reviews</h1>
        <CreateReviews />
      </div>

      <div className="space-y-4">
        <h1 className="font-semibold text-2xl">All Customer Review</h1>
        <div className="flex flex-wrap gap-6">
          {reviews?.customerReview?.map((item: IReviews) => (
            <div
              className="group transition-all duration-500 relative"
              key={item?._id}
            >
              <Image
                src={`${serverUrl}/${item?.image}`}
                alt="Customer reviews"
                width={300}
                height={200}
              />
              <div className="group-hover:block hidden transition-all absolute top-1 right-1">
                <ReviewDeleteBtn id={item._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
