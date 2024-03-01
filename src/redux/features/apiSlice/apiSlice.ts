import { authOptions } from "@/lib/auth";
import { serverApi } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerSession } from "next-auth";
import { userLogin } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: serverApi,
    mode: "no-cors",
    prepareHeaders: async (headers) => {
      const session = await getServerSession(authOptions);
      headers.set("Content-Type", "application/json");
      if (session?.refreshToken) {
        headers.set("refresh_token", session?.refreshToken);
      }
      console.log(headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "/user/refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data?.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "/user/me",
        method: "GET",
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
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
  }),
});

export const { useLoadUserQuery } = apiSlice;
