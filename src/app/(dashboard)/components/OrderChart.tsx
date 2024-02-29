"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useGetOrderStatusQuery } from "@/redux/features/orders/orderApi";
import { useSession } from "next-auth/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderChart = () => {
  const session = useSession();

  const { data } = useGetOrderStatusQuery({
    refresh_token: session.data?.refreshToken,
  });

  const pieData = {
    labels: [
      "Cancelled Orders",
      "Panding Orders",
      "Delivered Orders",
      "Shipped Order",
      "Processing Order",
    ],
    datasets: [
      {
        label: "Number Of Order",
        data: [
          data?.orderSummary?.totalCancelledOrder,
          data?.orderSummary?.totalPandingOrder,
          data?.orderSummary?.totalDeliveredOrder,
          data?.orderSummary?.totalShippedOrder,
          data?.orderSummary?.totalProcessingOrder,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "#8CB9BD",
          "#DBCC95",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "#8CB9BD",
          "#DBCC95",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pieData} />;
};

export default OrderChart;
