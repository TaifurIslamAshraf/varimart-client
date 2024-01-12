"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { LoadingButton } from "@/components/LoaderButton";
import { cn, serverUrl } from "@/lib/utils";

import {
  useUpdateProfileMutation,
  useUpdateUserInfoMutation,
} from "@/redux/features/users/usersApi";
import { Camera, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [fullName, setfullName] = useState(user?.fullName && user.fullName);
  const [phone, setPhone] = useState(user?.phone && user.phone);
  const [address, setAddress] = useState(user?.address && user.address);
  const [isMounded, setIsMounted] = useState(false);

  const [updateProfile, { isSuccess, error, isLoading, data }] =
    useUpdateProfileMutation();
  const [
    updateUserInfo,
    { isSuccess: nameIsSuccess, isLoading: nameIsLoading, data: nameData },
  ] = useUpdateUserInfoMutation();

  const router = useRouter();
  const handleImage = (e: any) => {
    const avatar = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", avatar);
    updateProfile(formData);
  };

  const handleName = async () => {
    await updateUserInfo({ fullName, phone, address });
  };

  useEffect(() => {
    if (nameIsSuccess) {
      toast.success(nameData.message);
    }
  }, [nameData, nameIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data?.message);
    }
  }, [data, error, isSuccess, router]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounded) {
    return null;
  }

  return (
    <div>
      <Card className="max-w-[500px] mx-auto">
        <CardHeader className="w-full flex justify-center">
          <div className="relative">
            <Image
              className={cn(
                "rounded-full m-auto w-[110px] h-[110px] object-cover",
                isLoading ? "blur-md" : ""
              )}
              src={
                user?.avatar
                  ? `${serverUrl}/${user.avatar}`
                  : "/default-avater.jpg"
              }
              alt="default avater"
              height={110}
              width={110}
            />
            <Loader2
              className={cn(
                `absolute inset-0 m-auto h-10 w-10 animate-spin`,
                isLoading ? "block" : "hidden"
              )}
            />
            <Input
              className="hidden"
              name="avatar"
              id="avatar"
              onChange={handleImage}
              type="file"
              disabled={isLoading}
              accept="image/jpeg,image/jpg,image/png,image/webp"
            />
            <Label
              htmlFor="avatar"
              className="absolute bottom-0 left-[50%] bg-secondary rounded-full p-1  mx-auto cursor-pointer"
            >
              <Camera className="z-20 h-[30px] w-[30px] rounded-full" />
            </Label>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="name"
              value={fullName}
              disabled={nameIsLoading}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input defaultValue={user?.email} readOnly disabled />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              disabled={nameIsLoading}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="addresss">Address</Label>
            <Input
              id="address"
              value={address}
              disabled={nameIsLoading}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          {nameIsLoading ? (
            <LoadingButton className="w-auto" />
          ) : (
            <Button onClick={handleName}>Save changes</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountInfo;
