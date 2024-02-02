import ProtectedDashboard from "@/lib/ProtectedDashboard";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <ProtectedDashboard>
        <Sidebar />
        {children}
      </ProtectedDashboard>
    </div>
  );
};

export default dashboardLayout;
