import { apiSlice } from "../apiSlice/apiSlice";
import { allCategory } from "./categorySlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: (data) => ({
        url: "/category/category-subcategory",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        dispatch(allCategory(result.data.category));
      },
    }),

    createCategory: build.mutation({
      query: ({ data, refresh_token }) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    createSubcategory: build.mutation({
      query: ({ data, refresh_token }) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    deleteCategory: build.mutation({
      query: ({ id, refresh_token }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    deleteSubcategory: build.mutation({
      query: ({ id, refresh_token }) => ({
        url: `/subcategory/delete-subcategory/${id}`,
        method: "DELETE",
        headers: {
          refresh_token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = categoryApi;
