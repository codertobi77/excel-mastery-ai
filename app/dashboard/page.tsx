"use client";

import { FiBook, FiAward, FiTrendingUp, FiClock, FiCheckCircle, FiBarChart2 } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Données simulées pour le graphique
const progressData = [
  { day: 'Lun', minutes: 45 },
  { day: 'Mar', minutes: 30 },
  { day: 'Mer', minutes: 60 },
  { day: 'Jeu', minutes: 90 },
  { day: 'Ven', minutes: 45 },
  { day: 'Sam', minutes: 120 },
  { day: 'Dim', minutes: 75 },
];

const courses = [
  { title: "Introduction à Excel", progress: 100, totalLessons: 10, completedLessons: 10 },
  { title: "Formules et Fonctions", progress: 60, totalLessons: 15, completedLessons: 9 },
  { title: "Tableaux Croisés Dynamiques", progress: 30, totalLessons: 12, completedLessons: 4 },
  { title: "Visualisation des Données", progress: 0, totalLessons: 8, completedLessons: 0 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom py-10">
        <FadeIn>
          <h1 className="heading-1 mb-8">Tableau de Bord</h1>
        </FadeIn>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FiBook, label: "Cours Suivis", value: "4 cours" },
            { icon: FiClock, label: "Temps Total", value: "8h 30min" },
            { icon: FiAward, label: "Exercices Réussis", value: "24/30" },
            { icon: FiTrendingUp, label: "Progression Globale", value: "47%" },
          ].map((stat, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="card hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-lg">
                    <stat.icon className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Graphique d'activité */}
        <FadeIn delay={0.4}>
          <div className="card mb-8">
            <h2 className="heading-2 mb-6">Activité Hebdomadaire</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-gray-600 dark:text-gray-400" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgb(var(--background))', 
                      borderColor: 'rgb(var(--border))' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeIn>

        {/* Progression des cours */}
        <FadeIn delay={0.5}>
          <div className="card">
            <h2 className="heading-2 mb-6">Progression des Cours</h2>
            <div className="space-y-6">
              {courses.map((course, index) => (
                <FadeIn key={index} delay={0.6 + index * 0.1}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-gray-900 dark:text-white font-medium">{course.title}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {course.completedLessons}/{course.totalLessons} leçons
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FiCheckCircle className={`w-4 h-4 ${
                        course.progress === 100 
                          ? "text-green-600 dark:text-green-500" 
                          : "text-gray-400 dark:text-gray-600"
                      }`} />
                      <span className="text-gray-600 dark:text-gray-400">
                        {course.progress === 100 ? "Terminé" : `${course.progress}% complété`}
                      </span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
} 