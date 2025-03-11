"use client";

import { useEffect, useState } from "react";
import { FiBook, FiClock, FiBarChart, FiPlus } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";
import { useSession } from "next-auth/react";

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  imageUrl?: string;
  chapters: Chapter[];
};

type Chapter = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  title: string;
  duration: number;
};

export default function CoursPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (!response.ok) throw new Error("Erreur lors du chargement des cours");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCourse = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/admin/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "course" }),
      });

      if (!response.ok) throw new Error("Erreur lors de la génération du cours");
      
      // Rafraîchir la liste des cours
      await fetchCourses();
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
            <h1 className="heading-1">Cours & Tutoriels Excel</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button
              onClick={handleGenerateCourse}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-5 h-5" />
              <span>{isGenerating ? "Génération..." : "Générer un nouveau cours"}</span>
            </button>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <FadeIn key={course.id}>
                <div className="card hover:scale-105 transition-transform cursor-pointer">
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <FiClock className="w-4 h-4" />
                        <span>{course.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiBarChart className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiBook className="w-4 h-4" />
                        <span>{course.chapters.length} chapitres</span>
                      </div>
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