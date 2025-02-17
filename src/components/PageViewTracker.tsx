"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PageViewTrackerProps {
  event: string;
  pageData: {
    title: string;
    type: string;
  };
  productData?: any;
}

const PageViewTracker: React.FC<PageViewTrackerProps> = ({
  event,
  pageData,
  productData,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  useEffect(() => {
    const trackingData: any = {
      event: event,
      page: {
        title: pageData.title,
        path: url,
        type: pageData.type,
      },
    };

    // Add ecommerce data only if product data is provided
    if (productData) {
      trackingData.ecommerce = {
        detail: {
          currencyCode: "BDT",
          products: productData,
        },
      };
    }

    window.dataLayer.push(trackingData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default PageViewTracker;
