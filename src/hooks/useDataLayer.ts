"use client";

type DataLayerEvent = {
  event: string;
  [key: string]: any;
};

export const useDataLayer = () => {
  const pushEvent = (event: DataLayerEvent) => {
    if (typeof window !== "undefined") {
      window.dataLayer?.push(event);
    }
  };

  return { pushEvent };
};
