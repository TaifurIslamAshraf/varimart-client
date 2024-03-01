"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  KeySquare,
  LayoutDashboard,
  LogOut,
  UserCog,
  WalletCards,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Page() {
  const session = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
    toast.success("Logout successfull");
  };

  return (
    <Card className="max-w-[500px] mx-auto mt-[140px]">
      <CardHeader>
        <CardTitle>Manage Your Profile</CardTitle>
        <CardDescription>
          Update Your profile picture and change your name, phone number and
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

        {session.data?.user?.fullName && session.data?.user.role === "admin" ? (
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
  );
}
