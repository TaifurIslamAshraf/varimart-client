"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { bannerSchema } from "@/lib/formSchema/bannerFormSchema";
import { cn } from "@/lib/utils";
import { useCreateBannerMutation } from "@/redux/features/banners/bannerApi";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CreateBanners = () => {
  const [subcategory, setSubcategory] = useState<any[] | null>([]);

  const [createBanner, { isLoading, isSuccess, error }] =
    useCreateBannerMutation();
  const { data } = useGetAllCategoryQuery({});

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isFocused,
    acceptedFiles,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 5000000,
  });

  //react hook form
  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      bannerType: "mainBanner",
      category: "",
      subcategory: "",
    },
  });

  const handleSubmit = async (value: z.infer<typeof bannerSchema>) => {
    const file = acceptedFiles[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("bannerType", value.bannerType);
    if (form.watch("bannerType") === "categoryBanner") {
      formData.append("category", value.category!);
      formData.append("image", value.subcategory!);
    }
    await createBanner({
      data: formData,
<<<<<<< HEAD
      accessToken: session?.data?.accessToken,
=======
>>>>>>> origin/production-version
    });
    customRevalidateTag("Banner");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("File Upload successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex items-center gap-6 mt-4">
              <FormField
                control={form.control}
                name="bannerType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Banner Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mainBanner">Main Banner</SelectItem>
                        <SelectItem value="categoryBanner">
                          Category Banner
                        </SelectItem>
                        <SelectItem value="topBanner">Top Banner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("bannerType") === "categoryBanner" && (
                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const selectedCategory = data?.category?.find(
                            (item: any) => item?._id.toString() === value
                          );
                          setSubcategory(selectedCategory?.subcategory || null);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.category &&
                            data?.category?.map((item: any) => (
                              <SelectItem
                                key={item?._id.toString()}
                                value={item?._id.toString()}
                              >
                                {item?.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* image dropzone */}
            <div
              className={cn(
                isDragAccept || (isFocused && "border-blue-500"),
                isDragReject && "border-red-500",
                "border-2 border-dashed text-center flex flex-col items-center justify-center h-44 transition-all"
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p>
                {isLoading ? "Image Uploading..." : "Drag & Drop Banner Image"}
              </p>
            </div>

            <Button className="w-full">Create Banner</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBanners;
