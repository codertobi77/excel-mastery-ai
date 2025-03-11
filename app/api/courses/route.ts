import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        chapters: {
          include: {
            lessons: true
          }
        }
      }
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des cours" },
      { status: 500 }
    );
  }
} 