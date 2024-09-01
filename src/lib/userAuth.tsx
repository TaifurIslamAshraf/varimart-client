"use client";
import { useSelector } from "react-redux";

function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  return !!user?.fullName;
}

export default UserAuth;
