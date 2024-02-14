import ProtectedDashboard from "@/lib/ProtectedDashboard";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <ProtectedDashboard>
        <Sidebar />
        {children}
      </ProtectedDashboard>
    </div>
  );
};

export default dashboardLayout;
