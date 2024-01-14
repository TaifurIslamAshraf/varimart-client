"use client";

import { serverUrl } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

import Link from "next/link";
import { useEffect, useState } from "react";
import defaultAvater from "../../public/default-avater.jpg";

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
          <Image
            className="cursor-pointer rounded-full m-auto w-[110px] h-full object-cover"
            src={user.avatar ? `${serverUrl}/${user.avatar}` : defaultAvater}
            alt="default avater"
            height={110}
            width={110}
          />
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
