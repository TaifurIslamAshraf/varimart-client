"use client";

import { ReactNode, useEffect } from "react";

export function DataLayerProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: any;
}) {
  useEffect(() => {
    // Initialize data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(initialData);
  }, [initialData]);

  return children;
}
