import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Sidebar />
      {children}
    </div>
  );
};

export default dashboardLayout;
