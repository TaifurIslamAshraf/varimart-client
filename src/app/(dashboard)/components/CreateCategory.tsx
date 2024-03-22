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
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/category/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Category Name is Required"),
});

const CreateCategory = () => {
  const [createCategory, { isLoading, isSuccess, error }] =
    useCreateCategoryMutation();
  const { refetch } = useGetAllCategoryQuery({});

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateCategory = async (
    value: z.infer<typeof createCategorySchema>
  ) => {
    await createCategory({
      data: value,
    });
    await refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category create successfull");
      form.reset();
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, form, isSuccess]);

  return (
    <div className="bg-gray-100 p-4 space-y-3 flex-1">
      <h1 className="font-medium text-lg">Create Category</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateCategory)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <LoadingButton className="w-full" />
          ) : (
            <Button className="w-full">Create Category</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateCategory;
