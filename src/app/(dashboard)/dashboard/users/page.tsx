import { getAllUsers } from "@/lib/fetch/user.data";

const page = async () => {
  const users = await getAllUsers();
  console.log(users, "user");
  console.log("first");

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      {/* <div className="">
        <h1 className="font-semibold text-2xl">All Users</h1>
        <div className="mt-6 space-y-4">
          {data && (
            <>
              <div className="max-w-[300px] w-full">
                <Select
                  onValueChange={(value) => handleChange(value)}
                  defaultValue={
                    defaultOrderStatus ? (defaultOrderStatus as string) : "All"
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by order status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>

                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <table className="border-collapse border-2 border-slate-300 p-4">
                <thead>
                  <tr>
                    <th className="border-2 border-slate-200 px-4 py-2">
                      Name
                    </th>
                    <th className="border-2 border-slate-200 px-4 py-2">
                      Order Status
                    </th>
                    <th className="border-2 border-slate-200 px-4 py-2">
                      Total Amount
                    </th>
                    <th className="border-2 border-slate-200 px-4 py-2">
                      Placed Date
                    </th>
                    <th className="border-2 border-slate-200 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data?.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-all duration-300"
                      >
                        <td className="border-2 border-slate-200 px-4 py-2">
                          {item.shippingInfo.fullName}
                        </td>
                        <td
                          className={cn(
                            item.orderStatus === "Pending" && "text-blue-400",
                            item.orderStatus === "Delivered" &&
                              "text-yellow-400",
                            item.orderStatus === "Cancelled" && "text-red-400",
                            "border-2 border-slate-200 px-4 py-2"
                          )}
                        >
                          {item.orderStatus}
                        </td>
                        <td className="border-2 border-slate-200 px-4 py-2">
                          {item.totalAmount}
                        </td>
                        <td className="border-2 border-slate-200 px-4 py-2">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="border-2 border-slate-200 px-4 py-2">
                          Action
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className=""></div>
                  )}
                </tbody>
              </table>
              <div className="flex items-center gap-6">
                <p className="text-sm">
                  Total Orders: {pagination.numOfOrders}
                </p>
              </div>
            </>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default page;
