"use client";

import { z } from "zod";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const registerFormSchema = z
  .object({
    fullName: z.string().min(1, "Enter Your Full Name"),
    email: z
      .string()
      .min(1, "Enter Your Email Address")
      .min(1, "Invalid Email Address"),
    phone: z
      .string()
      .min(1, "Enter Your Phone Number")
      .regex(/^(\+88)?(01[3-9]\d{8})$/, "Invalid Phone Number"),
    address: z.string().min(1, "Address is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password should be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password should be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
  });

  const handleSubmit = (value: z.infer<typeof registerFormSchema>) => {
    console.log(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            If you dont have an account register now. else login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-primary">Full Name</Label>
                    <FormControl>
                      <Input placeholder="MD. Taifur islam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-primary">Email</Label>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-primary">Phone Number</Label>
                    <FormControl>
                      <Input placeholder="Enter Your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-primary">Address</Label>
                    <FormControl>
                      <Input placeholder="Enter Your Full Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-primary">Password</Label>
                    <FormControl>
                      <Input placeholder="Enter Your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-primary">Confirm Password</Label>
                    <FormControl>
                      <Input
                        placeholder="Enter Your confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="gap-1 font-semibold">
          <h2>You alredy have an account?</h2>
          <Link href={"/login"} className="hover:underline text-blue-500">
            login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
