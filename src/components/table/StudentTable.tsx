import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

const StudentTable = ({ students }: any) => {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Student ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Course</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students &&
            students.length > 0 &&
            students.map((student: any, i: number) => (
              <Tr key={i}>
                <Td>{student.studentId}</Td>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.course}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
