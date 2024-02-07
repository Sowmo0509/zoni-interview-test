"use client";
import StudentTable from "@/components/table/StudentTable";
import { useGetStudentQuery } from "@/redux/services/student";
import { setStudent } from "@/redux/slices/studentSlice";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardBody, Heading, Text, Button, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Center, Input, Flex } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [queryText, setQueryText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setErrorText("");
    try {
      setIsLoading(true);
      const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/students/?sid=${queryText}`);
      if (data.message) return setErrorText(data.message);
      setSearchData([data.student]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
          <Box w={"full"}>
            <Heading size="md">Search Student</Heading>
            <Text>Search student by their Student ID.</Text>
            <Flex gap={2} mt={2} alignItems={"center"}>
              <Input onChange={(e) => setQueryText(e.target.value)} size={"md"} placeholder="Student ID" />
              <Button onClick={handleSearch} size={"md"} colorScheme="blue">
                Search
              </Button>
            </Flex>
          </Box>
        </CardHeader>

        <CardBody>
          {!isLoading && searchData && <StudentTable students={searchData} />}
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {!isLoading && errorText.length > 1 && (
            <Center>
              <p className="mt-8 bg-red-300 w-full text-center py-2 rounded-lg font-bold">{errorText}</p>
            </Center>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
