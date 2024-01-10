"use client";

import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

import { useActivationMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LoadingButton } from "./LoaderButton";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const Activation = ({ setOpen, open, message }: Props) => {
  const [otp, setOtp] = useState("");
  const [isMounted, setIsModunted] = useState(false);
  const router = useRouter();

  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isLoading, error, isSuccess }] = useActivationMutation();

  const activateHandler = () => {
    activation({
      token: token,
      activation_code: otp,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activate successfull");
      router.replace("/login");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);

  const onClose = () => {
    setOpen(false);
  };

  //handle hidretion error
  useEffect(() => {
    setIsModunted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className="text-green-500">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="mx-2"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "50px",
              height: "50px",
              border: "2px solid black",
              borderRadius: "5px",
              textAlign: "center",
            }}
            inputType="number"
          />
        </div>
        <DialogFooter>
          {isLoading ? (
            <LoadingButton className="w-full" variant="outline" />
          ) : (
            <Button
              onClick={activateHandler}
              variant={"outline"}
              disabled={otp.length < 4}
              className="w-full mt-4"
            >
              Activate Account
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Activation;
