"use client";

import { cn } from "@/lib/utils";
import {
  useDeleteCategoryMutation,
  useDeleteSubcategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/category/categoryApi";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICategory, ISubcategory } from "../../../../../types/category";
import CreateCategory from "../../components/CreateCategory";
import CreateSubategory from "../../components/CreateSubcategory";

const CategorySubcategory = () => {
  const [subcategory, setSubcategory] = useState<ISubcategory | undefined>();
  const [categoryId, setCategoryId] = useState("");
  const session = useSession();

  const { data, refetch } = useGetAllCategoryQuery({});
  const [
    deleteCategory,
    {
      isSuccess: categoryIsSuccess,
      error: categoryError,
      isLoading: categoryIsLoading,
    },
  ] = useDeleteCategoryMutation();
  const [
    deletesubCategory,
    {
      isSuccess: subCategoryIsSuccess,
      error: subCategoryError,
      isLoading: subCategoryIsLoading,
    },
  ] = useDeleteSubcategoryMutation();

  const category = data?.category as ICategory;

  const handleCategory = (
    categoryId: string,
    subcategory: ISubcategory | undefined
  ) => {
    setSubcategory(subcategory);
    setCategoryId(categoryId);
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory({ id, refresh_token: session?.data?.refreshToken });
    await refetch();
  };
  const handleDeletesubCategory = async (id: string) => {
<<<<<<< HEAD
    await deletesubCategory({ id, accessToken: session?.data?.accessToken });
    await deleteCategory({ id });
    await refetch();
  };
  const handleDeletesubCategory = async (id: string) => {
    await deletesubCategory({ id });
=======
    await deletesubCategory({ id, refresh_token: session?.data?.refreshToken });
>>>>>>> parent of dd4062c (make compateble with next-auth)
    await refetch();
  };

  useEffect(() => {
    if (categoryIsSuccess) {
      toast.success("Category delete successfull");
    } else if (categoryError) {
      const errorData = categoryError as any;
      toast.error(errorData?.data?.message);
    }
  }, [categoryError, categoryIsSuccess]);

  useEffect(() => {
    if (subCategoryIsSuccess) {
      toast.success("Subcategory delete successfull");
    } else if (subCategoryError) {
      const errorData = subCategoryError as any;
      toast.error(errorData?.data?.message);
    }
  }, [subCategoryError, subCategoryIsSuccess]);

  return (
    <div className="ml-[230px] mt-[70px] p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl">Manage Category</h1>
        <div className="flex justify-between gap-6">
          <CreateCategory />
          <CreateSubategory />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl">All Category</h1>
        <div className="flex justify-between gap-6">
          <ul className="flex-1 bg-gray-100 shadow-md rounded-md">
            {category?.map((item) => {
              return (
                <li
                  onClick={() => handleCategory(item?._id, item?.subcategory)}
                  className={cn(
                    categoryId === item?._id.toString()
                      ? "bg-blue-500 text-white"
                      : "",
                    "text-lg font-medium group cursor-pointer hover:bg-blue-400 hover:text-white transition-all py-1 my-2 px-4"
                  )}
                  key={item?._id}
                >
                  <div className="flex items-center justify-between">
                    <span>{item?.name}</span>
                    <button
                      disabled={categoryIsLoading}
                      onClick={() => handleDeleteCategory(item?._id)}
                      className="group-hover:block hidden rounded bg-gray-50 p-1"
                    >
                      <Trash2 className="text-red-400" size={20} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 text-lg font-medium rounded-md">
            {subcategory?.length! > 0 ? (
              <ul className="shadow-md bg-gray-100 py-1">
                {subcategory &&
                  subcategory?.map((subItem) => (
                    <li
                      key={subItem?._id}
                      className="text-lg group font-medium cursor-pointer hover:bg-green-400 hover:text-white transition-all py-1 my-2 px-4"
                    >
                      <div className="flex items-center justify-between">
                        <span>{subItem?.name}</span>
                        <button
                          onClick={() => handleDeletesubCategory(subItem?._id)}
                          className="group-hover:block hidden rounded bg-gray-50 p-1"
                        >
                          <Trash2 className="text-red-400" size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <h2 className="flex items-center justify-center h-full text-red-300">
                Select a category
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySubcategory;
