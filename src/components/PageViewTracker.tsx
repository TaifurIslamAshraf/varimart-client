"use client";

import { useEffect } from "react";

interface PageViewTrackerProps {
  pageData: {
    title: string;
    path: string;
    type: string;
  };
  productData?: any;
}

const PageViewTracker: React.FC<PageViewTrackerProps> = ({
  pageData,
  productData,
}) => {
  useEffect(() => {
    const trackingData: any = {
      event: "page_view",
      page: {
        title: pageData.title,
        path: pageData.path,
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
  }, [pageData, productData]);

  return null;
};

export default PageViewTracker;
