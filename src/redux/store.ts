"use client";
import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./services/student";
import studentSlice from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    // APIs
    [studentApi.reducerPath]: studentApi.reducer,

    // Slices
    student: studentSlice,
  },
  // Middlewares
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
