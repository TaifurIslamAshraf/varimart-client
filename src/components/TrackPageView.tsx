"use client";

import { useDataLayer } from "@/hooks/useDataLayer";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const TrackPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushEvent } = useDataLayer();

  useEffect(() => {
    const url = `${pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    pushEvent({
      event: "page_view",
      page_path: url,
      page_title: document.title,
    });
  }, [pathname, searchParams, pushEvent]);

  return null;
};
