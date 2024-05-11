import { apiSlice } from "../apiSlice/apiSlice";
import { updateUser } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
<<<<<<< HEAD
      query: ({ formData, accessToken }) => ({
        url: "/user/update-avatar",
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: (formData) => ({
        url: "/user/update-avatar",
        method: "PUT",
        body: formData,
>>>>>>> origin/production-version
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
<<<<<<< HEAD
      query: ({ data, accessToken }) => ({
        url: "/user/update-info",
        method: "PUT",
        body: data,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: (data) => ({
        url: "/user/update-info",
        method: "PUT",
        body: data,

>>>>>>> origin/production-version
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
<<<<<<< HEAD
      query: ({ oldPassword, newPassword, accessToken }) => ({
=======
      query: ({ oldPassword, newPassword }) => ({
>>>>>>> origin/production-version
        url: "/user/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
<<<<<<< HEAD
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======

>>>>>>> origin/production-version
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
