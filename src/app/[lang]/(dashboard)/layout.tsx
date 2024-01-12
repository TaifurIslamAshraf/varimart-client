import ProtectedDashboard from "@/lib/ProtectedDashboard";
import { ReactNode } from "react";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ProtectedDashboard>{children}</ProtectedDashboard>
    </div>
  );
};

export default dashboardLayout;
