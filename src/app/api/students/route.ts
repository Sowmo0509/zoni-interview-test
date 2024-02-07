import { prisma } from "../../../../prisma";

// Add Students
export async function POST(req: Request) {
  const data = await req.json();
  const student = await prisma.student.create({ data });
  return Response.json({ success: true, message: `${student.name} added successfully!` });
}

// Get Students
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("sid");

  // if query params
  if (param) {
    const student = await prisma.student.findUnique({ where: { studentId: param } });
    if (student) {
      return Response.json({ success: true, student });
    } else {
      return Response.json({ success: false, message: "Student not found!" });
    }
  }

  // if no query params
  const students = await prisma.student.findMany();

  return Response.json(students);
}
