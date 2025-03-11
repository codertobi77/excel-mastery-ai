import { FiUsers, FiMessageCircle, FiAward } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";

export default function Communaute() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom py-20">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Communauté Excel</h1>
            <p className="subtitle max-w-2xl mx-auto">
              Rejoignez une communauté active d'apprenants Excel et partagez 
              vos connaissances avec d'autres passionnés.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn direction="left">
            <div className="card">
              <h2 className="heading-2 mb-6">Discussions Récentes</h2>
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <FadeIn key={index} delay={0.1 * index}>
                    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0 py-4 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 dark:bg-green-600/20 p-2 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                          <FiMessageCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                        </div>
                        <div>
                          <h3 className="text-gray-900 dark:text-white font-semibold mb-1 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                            {discussion.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {discussion.author} · {discussion.replies} réponses
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn direction="right" delay={0.2}>
              <div className="card">
                <h2 className="heading-2 mb-6">Top Contributeurs</h2>
                <div className="space-y-4">
                  {contributors.map((contributor, index) => (
                    <FadeIn key={index} delay={0.3 + 0.1 * index}>
                      <div className="flex items-center justify-between py-2 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors rounded-lg px-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FiUsers className="w-4 h-4 text-green-600 dark:text-green-500" />
                          </div>
                          <span className="text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors">
                            {contributor.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FiAward className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600 dark:text-gray-400">{contributor.points} pts</span>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

const discussions = [
  {
    title: "Comment optimiser les macros VBA ?",
    author: "Marie L.",
    replies: 12
  },
  {
    title: "Astuces pour les tableaux croisés dynamiques",
    author: "Pierre D.",
    replies: 8
  },
  {
    title: "Meilleures pratiques Power Query",
    author: "Sophie M.",
    replies: 15
  }
];

const contributors = [
  {
    name: "Thomas R.",
    points: 1250
  },
  {
    name: "Julie M.",
    points: 980
  },
  {
    name: "Nicolas P.",
    points: 750
  }
]; 