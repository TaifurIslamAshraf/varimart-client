import { apiSlice } from "../apiSlice/apiSlice";
import { updateUser } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ formData }) => ({
        url: "/user/update-avatar",
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateUser({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUserInfo: builder.mutation({
      query: ({ data }) => ({
        url: "/user/update-info",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            updateUser({
              user: result.data.updatedUser,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUserPassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/user/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} = userApi;
