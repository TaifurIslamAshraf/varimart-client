"use client";

import ComponentLoader from "@/components/ComponentLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

type IUsers = {
  address: string;
  avatar: string;
  createdAt: Date;
  email: string;
  fullName: string;
  isSocialAuth: Boolean;
  phone: string;
  role: string;
  updatedAt: Date;
  _id: string;
};

const Users = () => {
  const session = useSession();

  const { isLoading, data } = useGetAllUsersQuery({
    refresh_token: session?.data?.refreshToken,
  });
  const { isLoading, data } = useGetAllUsersQuery({});
  const [updateUserRole, { isSuccess, error }] = useUpdateUserRoleMutation();

  const handleChangeRole = async (value: string, userId: string) => {
    await updateUserRole({
      data: {
        userId: userId,
        role: value,
      },
      refresh_token: session?.data?.refreshToken,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Role update success");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div className="ml-[230px] mt-[70px] p-4">
      <div className="">
        <h1 className="font-semibold text-2xl">All Users</h1>
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <ComponentLoader />
          ) : (
            <>
              {data && (
                <>
                  <table className="border-collapse border-2 border-slate-300 p-4">
                    <thead>
                      <tr>
                        <th className="border-2 border-slate-200 px-4 py-2">
                          Name
                        </th>
                        <th className="border-2 border-slate-200 px-4 py-2">
                          Email
                        </th>
                        <th className="border-2 border-slate-200 px-4 py-2">
                          Phone
                        </th>
                        <th className="border-2 border-slate-200 px-4 py-2">
                          Role
                        </th>
                        <th className="border-2 border-slate-200 px-4 py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.users ? (
                        data?.users?.map((item: IUsers) => (
                          <tr
                            key={item?._id}
                            className="hover:bg-gray-50 transition-all duration-300"
                          >
                            <td className="border-2 border-slate-200 px-4 py-2">
                              {item?.fullName}
                            </td>
                            <td
                              className={cn(
                                "border-2 border-slate-200 px-4 py-2"
                              )}
                            >
                              {item?.email}
                            </td>
                            <td className="border-2 border-slate-200 px-4 py-2">
                              {item?.phone}
                            </td>
                            <td className="border-2 border-slate-200 px-4 py-2">
                              {item?.role}
                            </td>
                            <td className="border-2 border-slate-200 px-4 py-2">
                              <div className="max-w-[300px] w-full">
                                <Select
                                  onValueChange={(value) =>
                                    handleChangeRole(value, item?._id)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Update User Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className=""></div>
                      )}
                    </tbody>
                  </table>
                  <div className="flex items-center gap-6">
                    <p className="text-sm">Total Users: {data?.userLength}</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
