import { apiSlice } from "../apiSlice/apiSlice";
import { loadUser, userLogin, userLogout, userRegistretion } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/user/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    register: build.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Users"] as any,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistretion({ token: result.data.activationToken }));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    activation: build.mutation({
      query: (data) => ({
        url: "/user/activate",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: build.query({
      query: () => ({
        url: "/user/logout",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogout({}));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/user/reset-password",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    forgotPassword: build.mutation({
      query: ({ email }) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: { email: email },

        credentials: "include",
      }),
    }),
    getAllUsers: build.query({
      query: ({}) => ({
        url: "/user/all-users",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Users"] as any,
    }),

    updateUserRole: build.mutation({
      query: ({ data }) => ({
        url: "/user/update-role",
        method: "PUT",
        body: data,

        credentials: "include",
      }),
      invalidatesTags: ["Users"] as any,
    }),

    getMe: build.query({
      query: ({}) => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Users"] as any,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(loadUser(result?.data?.user));
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useActivationMutation,
  useLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useGetMeQuery,
} = authApi;
