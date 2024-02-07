"use client";
import StudentTable from "@/components/table/StudentTable";
import { useGetStudentQuery } from "@/redux/services/student";
import { setStudent } from "@/redux/slices/studentSlice";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardBody, Heading, Text, Button, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Center, Input, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.student.students);
  const { data, error, isLoading } = useGetStudentQuery();

  useEffect(() => {
    checkForStudentsState();
  }, [data]);

  const checkForStudentsState = async () => {
    if (students?.length > 0) return;
    dispatch(setStudent(data!));
  };

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center">
      <Card>
        <CardHeader display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
          <Box mr={8}>
            <Heading size="md">Students Listing</Heading>
            <Text>Added students information are shown here.</Text>
          </Box>
          <Flex gap={2}>
            <Link href={"/add"}>
              <Button size={"sm"} colorScheme={"blue"}>
                Add Student
              </Button>
            </Link>
            <Link href={"/search"}>
              <Button size={"sm"} colorScheme={"blue"}>
                Search Student
              </Button>
            </Link>
          </Flex>
        </CardHeader>

        <CardBody>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <StudentTable students={students} />
          )}
        </CardBody>
      </Card>
    </main>
  );
}
