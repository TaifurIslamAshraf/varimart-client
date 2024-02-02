"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import { useGetOrderStatusQuery } from "@/redux/features/orders/orderApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderChart = () => {
  const { data } = useGetOrderStatusQuery({});

  console.log(
    data?.orderSummary?.totalCancelledOrder,
    data?.orderSummary?.totalPandingOrder,
    data?.orderSummary?.totalDeliveredOrder
  );

  const pieData = {
    labels: ["Cancelled Orders", "Panding Orders", "Delivered Orders"],
    datasets: [
      {
        label: "Number Of Order",
        data: [
          data?.orderSummary?.totalCancelledOrder,
          data?.orderSummary?.totalPandingOrder,
          data?.orderSummary?.totalDeliveredOrder,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pieData} />;
};

export default OrderChart;
