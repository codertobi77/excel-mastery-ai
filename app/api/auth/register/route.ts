import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, nationality, age, gender } = await req.json();

    if (!firstName || !lastName || !email || !password || !nationality || !age || !gender) {
      return new NextResponse("Données manquantes", { status: 400 });
    }

    // Vérification de l'âge
    if (age < 12 || age > 120) {
      return new NextResponse("Âge invalide", { status: 400 });
    }

    // Vérification de l'email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("Email déjà utilisé", { status: 400 });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        nationality,
        age,
        gender,
      },
    });

    return NextResponse.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 