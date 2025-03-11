import { Metadata } from "next";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Connexion | Excel Mastery AI",
  description: "Connectez-vous à votre compte Excel Mastery AI",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom min-h-[calc(100vh-4rem)] flex items-center justify-center py-10">
        <div className="w-full max-w-md px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white inline-block hover:scale-105 transition-transform">
                Excel Mastery AI
              </Link>
              <h1 className="heading-2 mt-8 mb-2">
                Connexion
              </h1>
              <p className="subtitle">
                Bienvenue sur votre espace d'apprentissage Excel
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="card">
              <SignInForm />
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Pas encore de compte ?{" "}
                  <Link href="/auth/signup" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
                    S'inscrire
                  </Link>
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              En vous connectant, vous acceptez nos{" "}
              <Link href="/terms" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
                Conditions d'utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
                Politique de confidentialité
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
} 