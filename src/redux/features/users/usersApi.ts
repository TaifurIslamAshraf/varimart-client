import { apiSlice } from "../apiSlice/apiSlice";
import { updateUser } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ formData, refresh_token }) => ({
        url: "/user/update-avatar",
        method: "PUT",
        body: formData,
        headers: {
          refresh_token,
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
      query: ({ data, refresh_token }) => ({
        url: "/user/update-info",
        method: "PUT",
        body: data,
        headers: {
          refresh_token,
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
      query: ({ oldPassword, newPassword, refresh_token }) => ({
        url: "/user/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        headers: {
          refresh_token,
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
