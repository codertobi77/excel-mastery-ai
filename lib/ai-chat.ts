const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-6.7b-instruct";

export async function generateStreamResponse(message: string) {
  try {
    const prompt = `<|system|>Tu es un tuteur Excel expert qui fournit des réponses claires et concises.</|system|>
<|user|>${message}</|user|>
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
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      // En cas d'erreur, retourner une réponse par défaut
      return "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.";
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error("Error generating tutor response:", error);
    return "Une erreur est survenue. Veuillez réessayer plus tard.";
  }
}