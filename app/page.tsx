import Link from "next/link";
import { FiBook, FiUser, FiTarget, FiUsers, FiTrendingUp, FiRefreshCw } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <main className="container-custom pt-20">
        <div className="flex flex-col items-center text-center mb-20">
          <FadeIn delay={0.2}>
            <div className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 px-4 py-1 rounded-full text-sm mb-6 flex items-center">
              <span className="mr-2">Nouveau</span>
              <Link href="/tuteur-ia" className="flex items-center hover:text-green-700 dark:hover:text-green-400">
                Découvrez notre tuteur IA
                <span className="ml-2">→</span>
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <h1 className="heading-1 mb-6">
              Maîtrisez Excel avec l'IA
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="subtitle max-w-2xl mb-8">
              Apprenez Excel à votre rythme avec notre tuteur IA intelligent. Des cours personnalisés, 
              des exercices pratiques et une communauté active pour tous les niveaux.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" 
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Commencer gratuitement
              </Link>
              <Link href="/about" 
                className="w-full sm:w-auto border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                En savoir plus
              </Link>
            </div>
          </FadeIn>
        </div>

        <section className="py-20">
          <FadeIn delay={0.6}>
            <div className="text-center mb-16">
              <div className="text-green-600 dark:text-green-500 mb-2">Apprentissage Accéléré</div>
              <h2 className="heading-2 mb-4">
                Tout ce dont vous avez besoin pour maîtriser Excel
              </h2>
              <p className="subtitle max-w-2xl mx-auto">
                Une plateforme complète qui combine intelligence artificielle et pédagogie 
                pour un apprentissage efficace et personnalisé.
              </p>
            </div>
          </FadeIn>

          <div className="grid-responsive">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={0.7 + index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                <div className="card group hover:scale-105 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-green-600 dark:text-green-500 mb-4 group-hover:rotate-12 transition-transform" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
    icon: FiUser,
    title: "Tuteur IA Personnel",
    description: "Un assistant intelligent disponible 24/7 pour répondre à toutes vos questions Excel."
  },
  {
    icon: FiBook,
    title: "Cours Adaptatifs",
    description: "Des formations personnalisées qui s'adaptent à votre niveau et à votre progression."
  },
  {
    icon: FiTarget,
    title: "Exercices Pratiques",
    description: "Mettez en pratique vos connaissances avec des exercices corrigés automatiquement."
  },
  {
    icon: FiUsers,
    title: "Communauté Active",
    description: "Échangez avec d'autres apprenants et partagez vos connaissances."
  },
  {
    icon: FiTrendingUp,
    title: "Suivi de Progression",
    description: "Visualisez votre évolution et identifiez vos points d'amélioration."
  },
  {
    icon: FiRefreshCw,
    title: "Contenu Actualisé",
    description: "Des ressources constamment mises à jour selon les dernières fonctionnalités d'Excel."
  }
];
