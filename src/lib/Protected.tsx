"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userAuth } from "./userAuth";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = userAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    router.replace("/");
  }

  return <>{isAuthenticated && children}</>;
};
export default Protected;
