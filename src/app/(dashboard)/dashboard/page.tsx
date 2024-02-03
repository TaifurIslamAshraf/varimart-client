import OrderChart from "../components/OrderChart";
import ProductStockChart from "../components/ProductStockChart";
import SalesChart from "../components/SalesChart";

const page = () => {
  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl ">Total Revenue</h1>
        <SalesChart />
      </div>
      <div className="lg:flex block items-center justify-between bg-gray-100 p-4 gap-4 text-center">
        <div className="space-y-4 mt-5 max-w-[450px] flex-1 w-full ">
          <h1 className="font-semibold text-2xl ">Order Summary</h1>
          <OrderChart />
        </div>
        <div className="space-y-4 mt-5 max-w-[450px] flex-1 w-full ">
          <h1 className="font-semibold text-2xl ">Product Stock</h1>
          <ProductStockChart />
        </div>
      </div>
    </div>
  );
};

export default page;
