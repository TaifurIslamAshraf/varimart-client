"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingButton } from "@/components/LoaderButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password should be at least 6 charecters"),
});

const Login = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const handleOnSubmit = (value: z.infer<typeof loginFormSchema>) => {
    login(value);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfull");
      router.replace("/");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData.data?.message);
    } else if (user?.fullName) {
      router.replace("/");
    }
  }, [error, isSuccess, router, user?.fullName]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login you account with your credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLoading ? (
                <LoadingButton className="w-full" />
              ) : (
                <Button className="w-full" type="submit">
                  Sign In
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-1 font-semibold">
          <h2>You don&apos;t have an account?</h2>
          <Link href={"/register"} className="hover:underline text-blue-500">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
