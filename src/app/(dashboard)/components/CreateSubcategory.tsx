"use client";

import { LoadingButton } from "@/components/LoaderButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateSubcategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const createSubcategorySchema = z.object({
  name: z.string().min(1, "Subcategory Name is Required"),
  category: z.string().min(1, "Category is required"),
});

const CreateSubategory = () => {
  const { refetch, data } = useGetAllCategoryQuery({});
  // const [deleteSubcategory, {isSuccess}] = useDeleteSubcategoryMutation()
  const [createSubcategory, { isLoading, isSuccess, error }] =
    useCreateSubcategoryMutation();

  const category = data?.category as any | undefined;

  const form = useForm<z.infer<typeof createSubcategorySchema>>({
    resolver: zodResolver(createSubcategorySchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const handleCreatesubCategory = async (
    value: z.infer<typeof createSubcategorySchema>
  ) => {
    await createSubcategory({
      data: value,
    });
    await refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("subCategory create successfull");
      form.reset();
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, form, isSuccess]);

  return (
    <div className="bg-gray-100 p-4 space-y-3 flex-1">
      <h1 className="font-medium text-lg">Create Subcategory</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreatesubCategory)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Cateory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category &&
                      category?.map((item: any) => (
                        <SelectItem
                          value={item?._id.toString()}
                          key={item?._id}
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Subcategory Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <LoadingButton className="w-full" />
          ) : (
            <Button className="w-full">Create Subcategory</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateSubategory;
