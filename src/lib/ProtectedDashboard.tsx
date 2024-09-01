"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedDashboard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const isAuthenticated = user?.fullName && user?.role === "admin";

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  // Return null while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedDashboard;
