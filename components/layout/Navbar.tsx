"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown, FiUser, FiGrid, FiLogOut } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Ajout du type pour la session
interface CustomSession {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export default function Navbar() {
  const pathname = usePathname();
  // Typage explicite de la session
  const { data: session } = useSession() as { data: CustomSession | null };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Pour debug - à retirer après
  console.log("Session:", session);

  const navItems = session ? [
    { label: "Tableau de Bord", href: "/dashboard" },
    { label: "Mes Cours", href: "/cours" },
    { label: "Tuteur IA", href: "/tuteur-ia" },
    { label: "Espace Pratique", href: "/exercices" },
  ] : [
    { label: "Tuteur IA", href: "/tuteur-ia" },
    { label: "Cours & Tutoriels", href: "/cours" },
    { label: "Communauté", href: "/communaute" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Excel Mastery AI
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === item.href
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle />
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-600/20 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-500 font-medium">
                      {(session.user?.firstName?.[0] || "U") + (session.user?.lastName?.[0] || "L")}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-white">
                    {session.user?.firstName + " " + session.user?.lastName || "Utilisateur L"}
                  </span>
                  <FiChevronDown className={cn(
                    "w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform",
                    isProfileOpen && "transform rotate-180"
                  )} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Connecté en tant que</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {session.user?.firstName + " " + session.user?.lastName || "Utilisateur"}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <FiUser className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <FiGrid className="w-4 h-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        signOut();
                      }}
                      className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Se connecter
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-400"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
            {session && (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}