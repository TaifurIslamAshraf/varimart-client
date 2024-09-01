"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedDashboard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // Allow access if the user is either an admin or a visitor
  const isAuthenticated =
    user?.fullName && (user?.role === "admin" || user?.role === "visitor");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/"); // Redirect to homepage if not authenticated
    }
  }, [isAuthenticated, router]);

  // Return null while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedDashboard;
