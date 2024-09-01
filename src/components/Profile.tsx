"use client";

import { serverUrl } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";

import { MyImage } from "@/app/(dashboard)/components/CustomImg";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isMounded, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounded) {
    return (
      <Link href={"/login"}>
        <CircleUserRound size={30} />
      </Link>
    );
  }

  return (
    <div className="">
      {user?.fullName ? (
        <Link href={"/profile"}>
          <div className="cursor-pointer rounded-full m-auto w-[40px] h-[40px]">
            <MyImage
              className="rounded-full object-cover"
              src={
                user.avatar
                  ? `${serverUrl}/${user.avatar}`
                  : "/default-avater.jpg"
              }
              alt="default avater"
              height={40}
              width={40}
            />
          </div>
        </Link>
      ) : (
        <Link href={"/login"}>
          <CircleUserRound size={30} />
        </Link>
      )}
    </div>
  );
};

export default Profile;
