import { FiShield, FiTrendingUp, FiUsers, FiAward, FiCpu } from "react-icons/fi";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom py-20">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">À Propos d'Excel Mastery AI</h1>
            <p className="subtitle max-w-2xl mx-auto">
              Découvrez comment nous révolutionnons l'apprentissage d'Excel grâce à 
              l'intelligence artificielle et une approche pédagogique innovante.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <FadeIn direction="left">
              <h2 className="heading-2 mb-6">Notre Mission</h2>
              <p className="subtitle mb-8">
                Excel Mastery AI a été créé avec une vision claire : rendre l'apprentissage 
                d'Excel accessible, efficace et personnalisé pour chacun. Notre plateforme 
                combine la puissance de l'IA avec une pédagogie éprouvée pour vous 
                accompagner dans votre progression.
              </p>
              <div className="grid gap-4">
                {stats.map((stat, index) => (
                  <FadeIn key={index} delay={0.1 * index}>
                    <div className="card flex items-center space-x-4 hover:scale-105 transition-transform">
                      <div className="bg-green-100 dark:bg-green-600/20 p-3 rounded-lg shrink-0">
                        <stat.icon className="w-6 h-6 text-green-600 dark:text-green-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
          
          <FadeIn direction="right" delay={0.2}>
            <div className="card">
              <h3 className="heading-2 mb-6">Pourquoi Nous Choisir ?</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <FadeIn key={index} delay={0.3 + 0.1 * index}>
                    <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform">
                      <div className="bg-green-100 dark:bg-green-600/20 p-2 rounded-lg shrink-0">
                        <feature.icon className="w-5 h-5 text-green-600 dark:text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-1">{feature.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="card mb-20">
            <h2 className="heading-2 mb-8 text-center">Notre Technologie</h2>
            <div className="grid-responsive">
              {technologies.map((tech, index) => (
                <FadeIn key={index} delay={0.5 + 0.1 * index}>
                  <div className="text-center group">
                    <div className="bg-green-100 dark:bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <tech.icon className="w-8 h-8 text-green-600 dark:text-green-500" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{tech.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="text-center">
            <h2 className="heading-2 mb-8">Nos Partenaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <FadeIn key={index} delay={0.7 + 0.1 * index}>
                  <div className="card hover:scale-105 transition-transform">
                    <div className="text-gray-600 dark:text-gray-400 text-center">{partner}</div>
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

const stats = [
  {
    icon: FiUsers,
    value: "10,000+",
    label: "Apprenants Actifs"
  },
  {
    icon: FiTrendingUp,
    value: "95%",
    label: "Taux de Satisfaction"
  },
  {
    icon: FiAward,
    value: "500+",
    label: "Exercices Disponibles"
  }
];

const features = [
  {
    icon: FiCpu,
    title: "IA de Pointe",
    description: "Notre technologie d'IA avancée s'adapte à votre niveau et votre style d'apprentissage."
  },
  {
    icon: FiShield,
    title: "Qualité Garantie",
    description: "Contenu vérifié et mis à jour régulièrement par des experts Excel."
  },
  {
    icon: FiUsers,
    title: "Communauté Active",
    description: "Rejoignez une communauté dynamique d'apprenants et d'experts."
  }
];

const technologies = [
  {
    icon: FiCpu,
    title: "IA Adaptative",
    description: "Apprentissage personnalisé basé sur vos performances"
  },
  {
    icon: FiShield,
    title: "Sécurité Avancée",
    description: "Protection des données et confidentialité garantie"
  },
  {
    icon: FiTrendingUp,
    title: "Analyse en Temps Réel",
    description: "Suivi détaillé de votre progression"
  }
];

const partners = [
  "Microsoft Partner",
  "Google Cloud",
  "AWS Partner",
  "HuggingFace"
]; 