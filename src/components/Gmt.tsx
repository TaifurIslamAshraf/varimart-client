export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M7RXHBCL";

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};
