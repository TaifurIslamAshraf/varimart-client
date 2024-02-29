"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useGetStockStatusQuery } from "@/redux/features/product/productApi";
import { useSession } from "next-auth/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductStockChart = () => {
  const session = useSession();
  const { data } = useGetStockStatusQuery({
    refresh_token: session?.data?.refreshToken,
  });

  const doughnutData = {
    labels: ["Out Of Stock", "Stock Avaliable"],
    datasets: [
      {
        label: "Number Of Product",
        data: [data?.productStockOut, data?.productStockAvailable],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={doughnutData} />;
};

export default ProductStockChart;
