import { serverUrl } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import defaultAvater from "../../public/default-avater.jpg";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="">
      {session?.user?.fullName ? (
        <Link href={"/profile"}>
          <div className="cursor-pointer rounded-full m-auto w-[40px] h-[40px]">
            <Image
              className="rounded-full object-cover"
              src={
                session?.user?.avatar
                  ? `${serverUrl}/${session?.user?.avatar}`
                  : defaultAvater
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
