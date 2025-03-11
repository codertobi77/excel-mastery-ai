import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateCourse, generateExercise, generatePersonalizedContent } from "@/lib/ai-content";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { type } = await req.json();

    // Générer du contenu personnalisé
    const content = await generatePersonalizedContent(session.user.id);

    if (type === "course") {
      const courseData = await generateCourse(content.topics[0]);
      
      const course = await prisma.course.create({
        data: {
          title: courseData.title,
          description: courseData.description,
          level: courseData.level,
          duration: courseData.duration,
          chapters: {
            create: courseData.chapters.map((chapter: any) => ({
              title: chapter.title,
              order: chapter.order,
              lessons: {
                create: chapter.lessons.map((lesson: any) => ({
                  title: lesson.title,
                  content: lesson.content,
                  duration: lesson.duration,
                  order: lesson.order
                }))
              }
            }))
          }
        }
      });

      return NextResponse.json(course);
    }

    if (type === "exercise") {
      const exerciseData = await generateExercise(content.topics[0], content.difficulty);
      
      // Créer ou récupérer la catégorie
      const category = await prisma.category.upsert({
        where: { name: content.topics[0] },
        update: {},
        create: { name: content.topics[0] }
      });

      const exercise = await prisma.exercise.create({
        data: {
          ...exerciseData,
          categoryId: category.id
        }
      });

      return NextResponse.json(exercise);
    }

    throw new Error("Type de contenu non valide");
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du contenu" },
      { status: 500 }
    );
  }
} 