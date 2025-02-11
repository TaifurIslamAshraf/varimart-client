"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useGTM() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushEvent = (event: any) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(event);
    }
  };

  useEffect(() => {
    if (pathname) {
      const url = searchParams.size
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      pushEvent({
        event: "page_view",
        page: url,
      });
    }
  }, [pathname, searchParams]);

  return { pushEvent };
}
