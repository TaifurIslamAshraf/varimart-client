"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { cn } from "@/lib/utils";
import { useCreateBannerMutation } from "@/redux/features/banners/bannerApi";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const CreateBanners = () => {
  const [bannerType, setBannerType] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState<any[] | null>([]);

  const [createBanner, { isLoading, isSuccess, error }] =
    useCreateBannerMutation();
  const { data } = useGetAllCategoryQuery({});

  const { getRootProps, getInputProps, isDragAccept, isDragReject, isFocused } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/webp": [".webp"],
      },
      maxFiles: 1,
      maxSize: 5000000,
      onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();

        formData.append("image", file);
        await createBanner(formData);
        customRevalidateTag("Banner");
      },
    });

  console.log(data);

  const handleChangeCategory = (value: string) => {
    console.log(value);
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
        <div className="">
          <Select onValueChange={(value) => setBannerType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Banner Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mainBanner">Main Banner</SelectItem>
              <SelectItem value="categoryBanner">Category Banner</SelectItem>
              <SelectItem value="topBanner">Top Banner</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <div className="">
            <Select
              onValueChange={(value) => handleChangeCategory(value)}
              value={category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Banner Type" />
              </SelectTrigger>
              <SelectContent>
                {data?.category?.map((item: any) => (
                  <SelectItem value={item?.id} key={item?._id}>
                    {item?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Select onValueChange={(value) => setBannerType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mainBanner">Main Banner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div
        className={cn(
          isDragAccept || (isFocused && "border-blue-500"),
          isDragReject && "border-red-500",
          "border-2 border-dashed text-center flex flex-col items-center justify-center h-44 transition-all"
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>{isLoading ? "Image Uploading..." : "Drag & Drop Banner Image"}</p>
      </div>
    </div>
  );
};

export default CreateBanners;
