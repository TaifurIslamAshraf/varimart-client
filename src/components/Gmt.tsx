"use client";

import { GoogleTagManager } from "@next/third-parties/google";

export const GTM = () => {
  return (
    <>
      <GoogleTagManager gtmId="GTM-M7RXHBCL" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
          `,
        }}
      />
    </>
  );
};
