"use client";
import { Card, CardHeader, CardBody, useToast, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentFormSchema } from "@/schema/studentFormSchema";
import { StudentType } from "@/types";
import FieldErrorText from "@/components/forms/FieldErrorText";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addStudent } from "@/redux/slices/studentSlice";

export default function AddStudent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<StudentType>({ resolver: zodResolver(StudentFormSchema) });

  const submitData = async (formData: StudentType) => {
    if (!isValid)
      toast({
        title: "Error adding the student!",
        status: "error",
      });

    setIsLoading(true);
    try {
      const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/students", { ...formData });
      toast({
        title: data.message,
        status: "success",
      });

      dispatch(addStudent({ ...formData }));

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center">
      <Card>
        <CardHeader display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
          <Box mr={8}>
            <Heading size="md">Add Student</Heading>
          </Box>
        </CardHeader>

        <CardBody>
          <div>
            <form className="inputs flex flex-col gap-y-3" onSubmit={handleSubmit(submitData)}>
              <Input type="text" {...register("studentId")} placeholder="Student ID" />
              {errors.studentId && <FieldErrorText>{errors.studentId.message}</FieldErrorText>}
              <Input type="text" {...register("name")} placeholder="Student Name" />
              {errors.name && <FieldErrorText>{errors.name.message}</FieldErrorText>}
              <Input type="email" {...register("email")} placeholder="Student Email" />
              {errors.email && <FieldErrorText>{errors.email.message}</FieldErrorText>}
              <Input type="text" {...register("course")} placeholder="Course Code" />
              {errors.course && <FieldErrorText>{errors.course.message}</FieldErrorText>}

              <Button isLoading={isLoading} type="submit" isDisabled={!isValid} colorScheme="blue" size={"sm"} className={`self-end mt-4`}>
                Add Data
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
