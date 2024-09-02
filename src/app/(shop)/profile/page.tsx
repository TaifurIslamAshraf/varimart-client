"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Protected from "@/lib/Protected";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { userLogout } from "@/redux/features/auth/authSlice";
import {
  KeySquare,
  LayoutDashboard,
  LogOut,
  UserCog,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const [isLogout, setIsLogout] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  // Call the logout query when isLogout is set to true
  const { data, error, isSuccess } = useLogoutQuery(undefined, {
    skip: !isLogout,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout successful");
      setIsLogout(false);
      userLogout({});
      router.replace("/");
      router.refresh();
    } else if (error) {
      toast.error("Failed to logout");
      setIsLogout(false);
    }
  }, [isSuccess, error, router]);

  const handleLogout = () => {
    setIsLogout(true);
  };

  return (
    <Protected>
      <Card className="max-w-[500px] mx-auto mt-[140px]">
        <CardHeader>
          <CardTitle>Manage Your Profile</CardTitle>
          <CardDescription>
            Update Your profile picture and change your name, phone number, and
            address{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border border-purple-200 px-2 py-3 rounded-md">
            <h1 className="font-semibold">Your Account Info</h1>
            <Link href={"/profile/accountInfo"}>
              <Button>
                <UserCog />{" "}
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between border border-purple-200 px-2 py-3 rounded-md">
            <h1 className="font-semibold">Your All Orders</h1>
            <Link href={"/profile/order-history"}>
              <Button>
                <WalletCards />{" "}
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between border border-purple-200 px-2 py-3 rounded-md">
            <h1 className="font-semibold">Update Your Password</h1>
            <Link href={"/profile/updatePassword"}>
              <Button>
                <KeySquare />
              </Button>
            </Link>
          </div>

          {user?.fullName &&
          (user?.role === "admin" || user?.role === "visitor") ? (
            <div className="flex items-center justify-between border border-purple-200 px-2 py-3 rounded-md">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Link href={"/dashboard"}>
                <Button>
                  <LayoutDashboard />
                </Button>
              </Link>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center justify-between border border-purple-200 px-2 py-3 rounded-md">
            <h1 className="font-semibold">Logout account</h1>
            <Button variant={"destructive"} onClick={handleLogout}>
              <LogOut />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Protected>
  );
}
