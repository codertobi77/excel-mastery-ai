import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany({
      include: {
        category: true
      }
    });
    return NextResponse.json(exercises);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des exercices" },
      { status: 500 }
    );
  }
} 