import { apiSlice } from "../apiSlice/apiSlice";
import { updateUser } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ formData, accessToken }) => ({
        url: "/user/update-avatar",
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${accessToken}`,
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
      query: ({ data, accessToken }) => ({
        url: "/user/update-info",
        method: "PUT",
        body: data,
        headers: {
          authorization: `Bearer ${accessToken}`,
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
      query: ({ oldPassword, newPassword, accessToken }) => ({
        url: "/user/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
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
