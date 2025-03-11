"use client";

import { useEffect, useState } from "react";
import { FiAward, FiFolder, FiPlus } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";
import { useSession } from "next-auth/react";

type Exercise = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: {
    name: string;
  };
};

export default function ExercicesPage() {
  const { data: session } = useSession();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch("/api/exercises");
      if (!response.ok) throw new Error("Erreur lors du chargement des exercices");
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateExercise = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/admin/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "exercise",
          difficulty: "MEDIUM" // Par défaut, peut être ajusté selon le niveau de l'utilisateur
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la génération de l'exercice");
      
      // Rafraîchir la liste des exercices
      await fetchExercises();
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom py-10">
        <div className="flex justify-between items-center mb-8">
          <FadeIn>
            <h1 className="heading-1">Exercices Pratiques</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button
              onClick={handleGenerateExercise}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-5 h-5" />
              <span>{isGenerating ? "Génération..." : "Générer un nouvel exercice"}</span>
            </button>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <FadeIn key={exercise.id}>
                <div className="card hover:scale-105 transition-transform cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exercise.title}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exercise.difficulty === "EASY" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : exercise.difficulty === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exercise.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <FiFolder className="w-4 h-4" />
                      <span>{exercise.category.name}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 