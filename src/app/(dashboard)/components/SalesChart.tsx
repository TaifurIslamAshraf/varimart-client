"use client";

import { useGetSalesReportQuery } from "@/redux/features/orders/orderApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChart = () => {
<<<<<<< HEAD
  const session = useSession();
  const { isLoading, data } = useGetSalesReportQuery({
    accessToken: session.data?.accessToken,
  });
=======
  const { isLoading, data } = useGetSalesReportQuery({});
>>>>>>> origin/production-version

  return (
    <ResponsiveContainer width="95%" height={340}>
      <BarChart
        data={data?.monthSales}
        margin={{
          top: 5,
        }}
        barSize={25}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
