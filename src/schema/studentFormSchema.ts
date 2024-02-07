import { StudentType } from "@/types";
import { z, ZodType } from "zod";

export const StudentFormSchema: ZodType<StudentType> = z.object({
  studentId: z.string().min(8, "Student ID should contain more than 8 characters!"),
  name: z.string().min(4, "Name should contain more than 4 characters!").max(128),
  email: z.string().email(),
  course: z.string().min(4, "Course name should contain more than 4 characters!").max(128),
});
