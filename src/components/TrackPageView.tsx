"use client";

import { Suspense } from "react";
import { useDataLayer } from "@/hooks/useDataLayer";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PageViewTracker = () => {
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

export const TrackPageView = () => {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
};