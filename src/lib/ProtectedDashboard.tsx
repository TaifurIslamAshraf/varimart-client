"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedDashboard = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const isAuthenticated =
    (user?.fullName && user?.role === "admin") || "visitor" ? true : false;

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
export default ProtectedDashboard;
