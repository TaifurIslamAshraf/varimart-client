"use client";
import { useSelector } from "react-redux";

export function userAuth() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useSelector((state: any) => state.auth);

  if (user?.fullName) {
    return true;
  } else {
    return false;
  }
}
