import { NextResponse } from "next/server";
import { generateStreamResponse } from "@/lib/ai-chat";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const response = await generateStreamResponse(message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération de la réponse" },
      { status: 500 }
    );
  }
}