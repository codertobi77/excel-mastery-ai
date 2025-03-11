import prisma from "@/lib/prisma";

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0";

export async function generateCourse(topic: string) {
  try {
    // Simplifions le prompt pour réduire la consommation de tokens
    const prompt = `<|system|>Tu es un expert Excel qui crée des cours.</|system|>
<|user|>Crée un cours sur ${topic} au format JSON avec title, description, level (BEGINNER), duration (30), et un chapitre avec une leçon.</|user|>
<|assistant|>`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500, // Réduit pour économiser des crédits
          temperature: 0.7,
          return_full_text: false
        }
      }),
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      
      // Si dépassement de crédits, retourner un cours par défaut
      return {
        title: `Introduction à ${topic}`,
        description: `Un cours pour débutants sur ${topic}`,
        level: "BEGINNER",
        duration: 30,
        chapters: [{
          title: "Premiers pas",
          order: 1,
          lessons: [{
            title: "Les bases",
            content: `Découvrez les fondamentaux de ${topic} dans Excel`,
            duration: 10,
            order: 1
          }]
        }]
      };
    }

    const data = await response.json();
    return JSON.parse(data[0].generated_text);
  } catch (error) {
    console.error("Error generating course:", error);
    // En cas d'erreur, retourner aussi un cours par défaut
    return {
      title: `Introduction à ${topic}`,
      description: `Un cours pour débutants sur ${topic}`,
      level: "BEGINNER",
      duration: 30,
      chapters: [{
        title: "Premiers pas",
        order: 1,
        lessons: [{
          title: "Les bases",
          content: `Découvrez les fondamentaux de ${topic} dans Excel`,
          duration: 10,
          order: 1
        }]
      }]
    };
  }
}

export async function generateExercise(topic: string, difficulty: string) {
  try {
    const prompt = `Génère un exercice Excel sur "${topic}" de difficulté ${difficulty}. 
    Format JSON attendu:
    {
      "title": "Titre de l'exercice",
      "description": "Description courte de l'exercice",
      "difficulty": "${difficulty}",
      "content": "Instructions détaillées de l'exercice",
      "solution": "Solution détaillée de l'exercice"
    }`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data[0].generated_text);
  } catch (error) {
    console.error("Error generating exercise:", error);
    throw error;
  }
}

export async function generatePersonalizedContent(userId: string) {
  try {
    // Récupérer la progression ou utiliser un niveau débutant par défaut
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
      include: {
        completedLessons: {
          include: { lesson: true }
        },
        completedExercises: {
          include: { exercise: true }
        }
      }
    });

    // Si pas de progression, proposer du contenu débutant
    if (!userProgress) {
      return {
        skillLevel: "BEGINNER",
        topics: [
          "Introduction à Excel",
          "Les bases des formules",
          "Mise en forme simple",
          "Trier et filtrer des données",
          "Créer des graphiques basiques"
        ],
        difficulty: "EASY"
      };
    }

    // Analyser les sujets déjà maîtrisés
    const completedTopics = new Set([
      ...userProgress.completedLessons.map((lp: { lesson: { title: string } }) => lp.lesson.title),
      ...userProgress.completedExercises.map((ep: { exercise: { title: string } }) => ep.exercise.title)
    ]);

    return {
      skillLevel: userProgress.skillLevel,
      topics: Array.from(completedTopics),
      difficulty: userProgress.skillLevel === "BEGINNER" ? "EASY" : 
                 userProgress.skillLevel === "INTERMEDIATE" ? "MEDIUM" : "HARD"
    };
  } catch (error) {
    console.error("Error getting user progress:", error);
    // En cas d'erreur, retourner aussi du contenu débutant
    return {
      skillLevel: "BEGINNER",
      topics: ["Introduction à Excel"],
      difficulty: "EASY"
    };
  }
} 