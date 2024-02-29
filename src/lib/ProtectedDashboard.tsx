import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

const ProtectedDashboard = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    return redirect("/");
  }

  return <>{session?.user?.role === "admin" && children}</>;
};
export default ProtectedDashboard;
