"use client";

import { useGetSalesReportQuery } from "@/redux/features/orders/orderApi";
import { useSession } from "next-auth/react";
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
  const session = useSession();
  const { isLoading, data } = useGetSalesReportQuery({
    refresh_token: session.data?.refreshToken,
  });

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
