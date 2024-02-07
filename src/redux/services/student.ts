"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StudentType } from "@/types";

export const studentApi = createApi({
  reducerPath: "studentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getStudent: builder.query<Array<StudentType>, void>({
      query: () => "students",
    }),
  }),
});

export const { useGetStudentQuery } = studentApi;
