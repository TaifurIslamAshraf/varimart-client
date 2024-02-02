import OrderChart from "../components/OrderChart";
import SalesChart from "../components/SalesChart";

const page = () => {
  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl ">Total Revenue</h1>
        <SalesChart />
      </div>
      <div className="space-y-4 mt-5 max-w-[500px] w-full">
        <h1 className="font-semibold text-2xl ">Order Summary</h1>
        <OrderChart />
      </div>
    </div>
  );
};

export default page;
