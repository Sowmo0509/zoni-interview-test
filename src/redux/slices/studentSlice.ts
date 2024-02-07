import { StudentType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type StudentState = {
  students: Array<StudentType>;
};

// Initial state
const initialState: StudentState = {
  students: [],
};

// Create slice
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<StudentType[]>) => {
      state.students = action.payload;
    },
    addStudent: (state, action: PayloadAction<StudentType>) => {
      state.students = [...state.students, action.payload];
    },
  },
});

export const { setStudent, addStudent } = studentSlice.actions;
export default studentSlice.reducer;
