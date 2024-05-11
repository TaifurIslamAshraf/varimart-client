"use client";

import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { cn } from "@/lib/utils";
import { useCreateReviewMutation } from "@/redux/features/customerReview/customerReviewApi";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const CreateReviews = () => {
  const [createReview, { isLoading, isSuccess, error }] =
    useCreateReviewMutation();

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
        await createReview({
          data: formData,
<<<<<<< HEAD
          accessToken: session?.data?.accessToken,
=======
>>>>>>> origin/production-version
        });
        customRevalidateTag("customerReview");
      },
    });

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
      <div
        className={cn(
          isDragAccept || (isFocused && "border-blue-500"),
          isDragReject && "border-red-500",
          "border-2 border-dashed text-center flex flex-col items-center justify-center h-44 transition-all"
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>{isLoading ? "Image Uploading..." : "Drag & Drop Review Image"}</p>
      </div>
    </div>
  );
};

export default CreateReviews;
