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
<<<<<<< HEAD
      query: ({ data, accessToken }) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({ data }) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
>>>>>>> origin/production-version
        credentials: "include",
      }),
    }),

    createSubcategory: build.mutation({
<<<<<<< HEAD
      query: ({ data, accessToken }) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({ data }) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
>>>>>>> origin/production-version
        credentials: "include",
      }),
    }),

    deleteCategory: build.mutation({
<<<<<<< HEAD
      query: ({ id, accessToken }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({ id }) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
>>>>>>> origin/production-version
        credentials: "include",
      }),
    }),

    deleteSubcategory: build.mutation({
<<<<<<< HEAD
      query: ({ id, accessToken }) => ({
        url: `/subcategory/delete-subcategory/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
=======
      query: ({ id }) => ({
        url: `/subcategory/delete-subcategory/${id}`,
        method: "DELETE",
>>>>>>> origin/production-version
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
