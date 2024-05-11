"use client";

import { serverUrl } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import defaultAvater from "../../public/default-avater.jpg";

const Profile = () => {
  const session = useSession();

  const {} = useGetMeQuery({ accessToken: session?.data?.accessToken });
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="">
      {user?.fullName ? (
        <Link href={"/profile"}>
          <div className="cursor-pointer rounded-full m-auto w-[40px] h-[40px]">
            <Image
              unoptimized
              className="rounded-full object-cover"
              src={
                user?.avatar ? `${serverUrl}/${user?.avatar}` : defaultAvater
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
